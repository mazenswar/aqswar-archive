import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import mawwals from "../../data/mawwals.json";
import "../../mawwals.scss";
import "./mawwal.scss";

export default function MawwalDetail({ params }) {
	const { category, id } = params;
	const data = mawwals.filter((p) => p.category === category);

	const index = data.findIndex((p) => p.id === id);
	if (index === -1) return notFound();

	const item = data[index];
	const prevItem = data[index - 1];
	const nextItem = data[index + 1];

	const fileUrl = `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}${item.fullPath}`;

	return (
		<main className="mawwals" dir="rtl">
			<section className="content-section">
				<h1 className="mawwals__title">{item.title}</h1>

				<div className="mawwals__viewer">
					<Image
						src={fileUrl}
						alt={item.filename}
						width={1200}
						height={800}
						className="mawwals__image"
					/>
				</div>

				<footer className="mawwals__nav">
					{prevItem ? (
						<Link
							href={`/photography/${category}/${prevItem.id}`}
							className="mawwals__nav-link mawwals__nav-link--prev"
						>
							الصورة السابقة →
						</Link>
					) : (
						<span className="mawwals__nav-link mawwals__nav-link--prev mawwals__nav-link--disabled">
							الصورة السابقة →
						</span>
					)}

					{nextItem ? (
						<Link
							href={`/photography/${category}/${nextItem.id}`}
							className="mawwals__nav-link mawwals__nav-link--next"
						>
							← الصورة التالية
						</Link>
					) : (
						<span className="mawwals__nav-link mawwals__nav-link--next mawwals__nav-link--disabled">
							← الصورة التالية
						</span>
					)}
				</footer>
			</section>
		</main>
	);
}
