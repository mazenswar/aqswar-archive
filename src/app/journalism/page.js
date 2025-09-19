import Link from "next/link";
import HeroSection from "../components/HeroSection/Component";
import "./Journalism.scss";

// Publication data with proper structure
const publications = [
	{
		id: "aak",
		name: "أخبار الخليج",
		href: "journalism//aak/",
		description: "جريدة يومية - عمود هواجس",
		period: "١٩٨٦ - ١٩٩٦",
	},
	{
		id: "alayam",
		name: "الأيام",
		href: "journalism//alayam",
		description: "جريدة يومية - عمود هواجس",
		period: "١٩٩٧ - ٢٠٠٥",
	},
	{
		id: "alwatan",
		name: "الوطن",
		href: "journalism//alwatan",
		description: "جريدة يومية - عمود هواجس",
		period: "٢٠٠٥ - ٢٠١٢",
	},
	{
		id: "sada",
		name: "صدى الأسبوع",
		href: "journalism/sada/",
		description: "مجلة أسبوعية",
		period: "١٩٧٣ - ١٩٧٧, ١٩٨٢",
	},
	{
		id: "panorama",
		name: "بانوراما الخليج",
		href: "journalism//panorama/",
		description: "مجلة شهرية",
		period: "١٩٨٣",
	},
];

// Metadata for Next.js
export const metadata = {
	title: "الصحافة - عقيل آل سوار",
	description: "مسيرة عقيل آل سوار الصحفية في المطبوعات البحرينية والخليجية",
	openGraph: {
		title: "الصحافة - عقيل آل سوار",
		description: "مسيرة عقيل آل سوار الصحفية في المطبوعات البحرينية والخليجية",
	},
};

export default function JournalismPage() {
	return (
		<main className="journalism-page" dir="rtl">
			{/* Hero Section */}
			<HeroSection page="journalism" />

			{/* Publications Section */}
			<section
				className="journalism-page__publications content-section"
				aria-label="المنشورات الصحفية"
			>
				<div className="container">
					<div className="journalism-page__intro">
						<h2 className="journalism-page__title">صحافة</h2>
					</div>

					<div className="journalism-page__grid">
						{publications.map((publication) => (
							<article
								key={publication.id}
								className={`journalism-page__card journalism-page__card--${publication.id}`}
							>
								<Link
									href={publication.href}
									className="journalism-page__card-link"
									aria-label={`اقرأ مقالات ${publication.name}`}
								>
									<div className="journalism-page__card-content">
										<h3 className="journalism-page__card-title">
											{publication.name}
										</h3>

										<p className="journalism-page__card-description">
											{publication.description}
										</p>

										<div className="journalism-page__card-period">
											<span className="journalism-page__card-period-label">
												الفترة:
											</span>
											<span className="journalism-page__card-period-value">
												{publication.period}
											</span>
										</div>
									</div>

									<div
										className="journalism-page__card-arrow"
										aria-hidden="true"
									>
										←
									</div>
								</Link>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
