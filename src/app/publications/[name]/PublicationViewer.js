"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./PublicationViewer.scss";

export default function PublicationViewer({ publication, pdfUrl }) {
	const [hasError, setHasError] = useState(false);

	// PDF error handler
	const handlePdfError = () => {
		setHasError(true);
	};

	if (!publication || !pdfUrl) {
		return (
			<div className="publication-error" dir="rtl">
				<div className="container">
					<h1>خطأ في التحميل</h1>
					<p>حدث خطأ في تحميل المنشور.</p>
					<Link href="/publications" className="btn btn--primary">
						العودة للمنشورات
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="publication" dir="rtl">
			{/* Header */}
			<header className="publication__header">
				<div className="container">
					{/* Breadcrumb */}
					<nav className="publication__breadcrumb" aria-label="مسار التنقل">
						<Link href="/publications" className="publication__breadcrumb-link">
							الإصدارات
						</Link>
						<span className="publication__breadcrumb-separator">←</span>
						<span className="publication__breadcrumb-current">
							{publication.nameAr}
						</span>
					</nav>

					{/* Publication Info */}
					<div className="publication__info">
						<h1 className="publication__title">{publication.nameAr}</h1>

						<div className="publication__meta">
							<span className="publication__category">
								{publication.category}
							</span>
							{publication.year && (
								<span className="publication__year">{publication.year}</span>
							)}
						</div>

						<p className="publication__description">
							{publication.description}
						</p>
					</div>

					{/* Controls */}
					<div className="publication__controls">
						<div className="publication__action-buttons">
							<a
								href={pdfUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="publication__download-btn"
								aria-label="فتح في نافذة جديدة"
							>
								فتح في نافذة جديدة
							</a>

							<a
								href={pdfUrl}
								download={publication.fileName}
								className="publication__download-btn publication__download-btn--download"
								aria-label="تحميل الملف"
							>
								تحميل
							</a>
						</div>
					</div>
				</div>
			</header>

			{/* Content */}
			<section className="publication__content">
				{hasError ? (
					<div className="publication__error">
						<h3>خطأ في التحميل</h3>
						<p>لم يتم العثور على الملف أو حدث خطأ في التحميل.</p>
						<div className="publication__error-actions">
							<a
								href={pdfUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="publication__retry-btn"
							>
								محاولة فتح الملف مباشرة
							</a>
							<Link href="/publications" className="publication__back-btn">
								العودة للمنشورات
							</Link>
						</div>
					</div>
				) : (
					<div className="publication__pdf-container">
						<iframe
							src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
							className="publication__pdf"
							title={publication}
							onError={handlePdfError}
							width="100%"
							height="100%"
						/>
					</div>
				)}
			</section>
		</main>
	);
}
