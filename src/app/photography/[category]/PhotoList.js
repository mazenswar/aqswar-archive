"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import photos from "../data/photos.json";
import "../photos.scss";

export default function PhotosList({ category, categoryAr }) {
	const items = useMemo(
		() => photos.filter((p) => p.category === category),
		[category]
	);

	const [currentPage, setCurrentPage] = useState(1);
	const photosPerPage = 12;

	const paginatedPhotos = useMemo(() => {
		const startIndex = (currentPage - 1) * photosPerPage;
		const endIndex = startIndex + photosPerPage;
		return items.slice(startIndex, endIndex);
	}, [items, currentPage, photosPerPage]);

	const totalPages = Math.ceil(items.length / photosPerPage);

	// Reset to page 1 if category changes
	useEffect(() => {
		setCurrentPage(1);
	}, [category]);

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			const start = Math.max(1, currentPage - 2);
			const end = Math.min(totalPages, start + maxVisiblePages - 1);
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
		}

		return pages;
	};

	if (items.length === 0) {
		return (
			<main className="photos" dir="rtl">
				<h1 className="photos__title">لا توجد صور</h1>
				<p className="photos__empty">لا توجد صور في هذا التصنيف.</p>
			</main>
		);
	}

	return (
		<main className="photos" dir="rtl">
			<section className="content-section">
				<h1 className="photos__title">{categoryAr}</h1>

				<div className="photos__grid">
					{paginatedPhotos.map((item) => (
						<Link
							key={item.id}
							href={`/photography/${category}/${item.id}`}
							className="photos__card"
						>
							<Image
								src={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}${item.fullPath}`}
								alt={item.title || item.filename}
								width={300}
								height={200}
								className="photos__thumbnail"
							/>
							<p className="photos__caption">{item.title}</p>
						</Link>
					))}
				</div>

				{totalPages > 1 && (
					<nav className="photos__pagination" aria-label="ترقيم الصفحات">
						<button
							className="photos__pagination-btn photos__pagination-btn--prev"
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(currentPage - 1)}
							aria-label="الصفحة السابقة"
						>
							السابق
						</button>

						<div className="photos__pagination-numbers">
							{getPageNumbers().map((pageNumber) => (
								<button
									key={pageNumber}
									className={`photos__pagination-number ${
										currentPage === pageNumber
											? "photos__pagination-number--active"
											: ""
									}`}
									onClick={() => setCurrentPage(pageNumber)}
									aria-label={`الصفحة ${pageNumber}`}
									aria-current={currentPage === pageNumber ? "page" : undefined}
								>
									{pageNumber}
								</button>
							))}
						</div>

						<button
							className="photos__pagination-btn photos__pagination-btn--next"
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage(currentPage + 1)}
							aria-label="الصفحة التالية"
						>
							التالي
						</button>
					</nav>
				)}
			</section>
		</main>
	);
}
