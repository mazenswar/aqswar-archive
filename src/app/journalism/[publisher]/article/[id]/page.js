import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "./article.scss";

function formatArabicDate(dateString) {
	try {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("ar-EG", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	} catch {
		return dateString;
	}
}

export default async function ArticlePage({ params }) {
	const { publisher, id } = params;

	let articles;
	try {
		articles = (await import(`../../data/index_${publisher}.json`)).default;
	} catch {
		return notFound();
	}

	const articleIndex = articles.findIndex((a) => a.id === id);
	if (articleIndex === -1) return notFound();

	const article = articles[articleIndex];
	const fileUrl = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${article.s3_key}`;

	const prevArticle = articles[articleIndex - 1];
	const nextArticle = articles[articleIndex + 1];

	const isPdf = article.s3_key?.toLowerCase().endsWith(".pdf");

	return (
		<main className="article" dir="rtl">
			<header className="article__header">
				<p className="article__publisher">
					{article.publisherAr} – {article.categoryAr}
				</p>
				<p className="article__meta">{formatArabicDate(article.date)}</p>
			</header>

			<div className="article__viewer">
				{isPdf ? (
					<>
						<div className="article__pdf--desktop">
							<iframe src={fileUrl} title={article.title} />
						</div>
						<div className="article__pdf--mobile">
							<Link href={fileUrl} target="_blank" rel="noopener noreferrer">
								عرض المقال كملف PDF
							</Link>
						</div>
					</>
				) : (
					<Image
						src={fileUrl}
						alt={article.categoryAr}
						width={1200}
						height={1600}
						className="article__image"
					/>
				)}
			</div>

			<footer className="article__nav">
				{/* Previous button (always left in RTL layout) */}
				{prevArticle ? (
					<Link
						href={`/journalism/${publisher}/article/${prevArticle.id}`}
						className="article__nav-link article__nav-link--prev"
					>
						المقال السابق
					</Link>
				) : (
					<span className="article__nav-link article__nav-link--prev article__nav-link--disabled">
						المقال السابق
					</span>
				)}

				{/* Next button (always right in RTL layout) */}
				{nextArticle ? (
					<Link
						href={`/journalism/${publisher}/article/${nextArticle.id}`}
						className="article__nav-link article__nav-link--next"
					>
						المقال التالي
					</Link>
				) : (
					<span className="article__nav-link article__nav-link--next article__nav-link--disabled">
						المقال التالي
					</span>
				)}
			</footer>
		</main>
	);
}
