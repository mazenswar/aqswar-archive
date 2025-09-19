"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import "./PublisherTemplate.scss";

// This component expects to receive articles data and publisher info as props
// Usage: <PublisherPage articles={articlesData} publisherInfo={publisherInfo} />
export default function PublisherTemplate({ articles = [], publisherInfo }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedYear, setSelectedYear] = useState("all");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [isLoading, setIsLoading] = useState(false);

	const articlesPerPage = 12;

	// Extract unique years and categories from articles
	const { availableYears, availableCategories } = useMemo(() => {
		const years = new Set();
		const categoriesMap = new Map();

		articles.forEach((article) => {
			if (article.date) {
				const date = new Date(article.date);
				// Check if date is valid before extracting year
				if (!isNaN(date.getTime())) {
					const year = date.getFullYear();
					// Ensure year is a valid number
					if (year && !isNaN(year) && year > 1900 && year < 2100) {
						years.add(year);
					}
				}
			}
			if (article.category && article.categoryAr) {
				categoriesMap.set(article.category, article.categoryAr);
			}
		});

		// Convert categories map to array of objects
		const categories = Array.from(categoriesMap.entries()).map(
			([value, label]) => ({
				value,
				label,
			})
		);

		return {
			availableYears: Array.from(years).sort((a, b) => b - a), // Newest first
			availableCategories: categories.sort((a, b) =>
				a.label.localeCompare(b.label, "ar")
			),
		};
	}, [articles]);

	// Filter articles based on selected filters
	const filteredArticles = useMemo(() => {
		return articles.filter((article) => {
			// Validate date before processing
			if (!article.date) return false;

			const date = new Date(article.date);
			if (isNaN(date.getTime())) return false;

			const articleYear = date.getFullYear();

			const yearMatch =
				selectedYear === "all" || articleYear.toString() === selectedYear;
			const categoryMatch =
				selectedCategory === "all" || article.category === selectedCategory;

			return yearMatch && categoryMatch;
		});
	}, [articles, selectedYear, selectedCategory]);

	// Paginated articles
	const paginatedArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * articlesPerPage;
		const endIndex = startIndex + articlesPerPage;
		return filteredArticles.slice(startIndex, endIndex);
	}, [filteredArticles, currentPage, articlesPerPage]);

	// Total pages
	const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

	// Reset pagination when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedYear, selectedCategory]);

	// Format date for display (Gregorian calendar with consistent numerals)
	const formatDate = (dateString) => {
		// Validate input
		if (!dateString) return "تاريخ غير محدد";

		const date = new Date(dateString);

		// Check if date is valid
		if (isNaN(date.getTime())) {
			return "تاريخ غير صحيح";
		}

		// Get date parts in English first for consistent numerals
		const day = date.getDate();
		const year = date.getFullYear();

		// Validate extracted values
		if (isNaN(day) || isNaN(year)) {
			return "تاريخ غير صحيح";
		}

		const arabicMonths = {
			January: "يناير",
			February: "فبراير",
			March: "مارس",
			April: "أبريل",
			May: "مايو",
			June: "يونيو",
			July: "يوليو",
			August: "أغسطس",
			September: "سبتمبر",
			October: "أكتوبر",
			November: "نوفمبر",
			December: "ديسمبر",
		};

		const monthName = date.toLocaleDateString("en", { month: "long" });
		const arabicMonth = arabicMonths[monthName] || monthName;

		return `${day} ${arabicMonth} ${year}`;
	};

	// Handle filter changes
	const handleYearChange = (year) => {
		setIsLoading(true);
		setSelectedYear(year);
		setTimeout(() => setIsLoading(false), 300); // Simulate loading
	};

	const handleCategoryChange = (category) => {
		setIsLoading(true);
		setSelectedCategory(category);
		setTimeout(() => setIsLoading(false), 300);
	};

	// Generate page numbers for pagination
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

	if (!publisherInfo) {
		return (
			<div className="publisher-page__error">معلومات الناشر غير متوفرة</div>
		);
	}

	return (
		<main className="publisher-page" dir="rtl">
			{/* Header */}
			<div className="publisher-page__header">
				<div className="container">
					<div className="publisher-page__breadcrumb">
						<Link
							href="/journalism"
							className="publisher-page__breadcrumb-link"
						>
							الصحافة
						</Link>
						<span className="publisher-page__breadcrumb-separator">←</span>
						<span className="publisher-page__breadcrumb-current">
							{publisherInfo.nameAr}
						</span>
					</div>

					<h1 className="publisher-page__title">{publisherInfo.nameAr}</h1>

					{publisherInfo.description && (
						<p className="publisher-page__description">
							{publisherInfo.description}
						</p>
					)}
				</div>
			</div>

			{/* Filters */}
			<section className="publisher-page__filters">
				<div className="container">
					<div className="publisher-page__filters-header">
						<h2 className="publisher-page__filters-title">تصفية المقالات</h2>
						<div className="publisher-page__results-count">
							{filteredArticles.length} مقال
						</div>
					</div>

					<div className="publisher-page__filters-row">
						{/* Year Filter */}
						<div className="publisher-page__filter">
							<label
								className="publisher-page__filter-label"
								htmlFor="year-filter"
							>
								السنة
							</label>
							<select
								id="year-filter"
								className="publisher-page__filter-select"
								value={selectedYear}
								onChange={(e) => handleYearChange(e.target.value)}
							>
								<option value="all">جميع السنوات</option>
								{availableYears.map((year) => (
									<option key={year} value={year.toString()}>
										{year}
									</option>
								))}
							</select>
						</div>

						{/* Category Filter */}
						<div className="publisher-page__filter">
							<label
								className="publisher-page__filter-label"
								htmlFor="category-filter"
							>
								النوع
							</label>
							<select
								id="category-filter"
								className="publisher-page__filter-select"
								value={selectedCategory}
								onChange={(e) => handleCategoryChange(e.target.value)}
							>
								<option value="all">جميع الأنواع</option>
								{availableCategories.map((category) => (
									<option key={category.value} value={category.value}>
										{category.label}
									</option>
								))}
							</select>
						</div>

						{/* Clear Filters */}
						{(selectedYear !== "all" || selectedCategory !== "all") && (
							<button
								className="publisher-page__clear-filters"
								onClick={() => {
									setSelectedYear("all");
									setSelectedCategory("all");
								}}
							>
								مسح التصفية
							</button>
						)}
					</div>
				</div>
			</section>

			{/* Articles Grid */}
			<section className="publisher-page__content">
				<div className="container">
					{isLoading ? (
						<div className="publisher-page__loading">جاري التحميل...</div>
					) : paginatedArticles.length > 0 ? (
						<div className="publisher-page__grid">
							{paginatedArticles.map((article) => (
								<article key={article.id} className="publisher-page__article">
									<Link
										href={`/journalism/${article.publisher}/article/${article.id}`}
										className="publisher-page__article-link"
										aria-label={`اقرأ مقال من ${formatDate(article.date)}`}
									>
										<div className="publisher-page__article-content">
											<div className="publisher-page__article-header">
												<span className="publisher-page__article-category">
													{article.categoryAr}
												</span>
											</div>

											<h3 className="publisher-page__article-date">
												{formatDate(article.date)}
											</h3>

											<div className="publisher-page__article-footer">
												<span className="publisher-page__article-action">
													اقرأ المقال
												</span>
												<span
													className="publisher-page__article-arrow"
													aria-hidden="true"
												>
													←
												</span>
											</div>
										</div>
									</Link>
								</article>
							))}
						</div>
					) : (
						<div className="publisher-page__empty">
							<h3>لا توجد مقالات</h3>
							<p>لم يتم العثور على مقالات تطابق التصفية المحددة.</p>
						</div>
					)}

					{/* Pagination */}
					{totalPages > 1 && (
						<nav
							className="publisher-page__pagination"
							aria-label="ترقيم الصفحات"
						>
							<button
								className="publisher-page__pagination-btn publisher-page__pagination-btn--prev"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(currentPage - 1)}
								aria-label="الصفحة السابقة"
							>
								السابق
							</button>

							<div className="publisher-page__pagination-numbers">
								{getPageNumbers().map((pageNumber) => (
									<button
										key={pageNumber}
										className={`publisher-page__pagination-number ${
											currentPage === pageNumber
												? "publisher-page__pagination-number--active"
												: ""
										}`}
										onClick={() => setCurrentPage(pageNumber)}
										aria-label={`الصفحة ${pageNumber}`}
										aria-current={
											currentPage === pageNumber ? "page" : undefined
										}
									>
										{pageNumber}
									</button>
								))}
							</div>

							<button
								className="publisher-page__pagination-btn publisher-page__pagination-btn--next"
								disabled={currentPage === totalPages}
								onClick={() => setCurrentPage(currentPage + 1)}
								aria-label="الصفحة التالية"
							>
								التالي
							</button>
						</nav>
					)}
				</div>
			</section>
		</main>
	);
}
