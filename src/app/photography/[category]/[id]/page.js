import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import photos from "../../data/photos.json";
import "../../photos.scss";
import "./photo.scss";

export default function PhotoDetail({ params }) {
	const { category, id } = params;
	const data = photos.filter((p) => p.category === category);

	const index = data.findIndex((p) => p.id === id);
	if (index === -1) return notFound();

	const item = data[index];
	const prevItem = data[index - 1];
	const nextItem = data[index + 1];

	const fileUrl = `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}${item.fullPath}`;

	return (
		<main className="photos" dir="rtl">
			<section className="content-section">
				<h1 className="photos__title">{item.title}</h1>

				<div className="photos__viewer">
					<Image
						src={fileUrl}
						alt={item.filename}
						width={1200}
						height={800}
						className="photos__image"
					/>
				</div>

				<footer className="photos__nav">
					{prevItem ? (
						<Link
							href={`/photography/${category}/${prevItem.id}`}
							className="photos__nav-link photos__nav-link--prev"
						>
							الصورة السابقة →
						</Link>
					) : (
						<span className="photos__nav-link photos__nav-link--prev photos__nav-link--disabled">
							الصورة السابقة →
						</span>
					)}

					{nextItem ? (
						<Link
							href={`/photography/${category}/${nextItem.id}`}
							className="photos__nav-link photos__nav-link--next"
						>
							← الصورة التالية
						</Link>
					) : (
						<span className="photos__nav-link photos__nav-link--next photos__nav-link--disabled">
							← الصورة التالية
						</span>
					)}
				</footer>
			</section>
		</main>
	);
}
