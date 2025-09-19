// app/journalism/[publisher]/page.js
import { notFound } from "next/navigation";
import PublisherTemplate from "../PublisherTemplate";

// Publisher configurations
const publisherConfigs = {
	sada: {
		id: "sada",
		nameAr: "صدى الأسبوع",
		nameEn: "Sada Al Usboa",
		description: "مجلة أسبوعية بحرينية (١٩٧٣ - ١٩٧٧, ١٩٨٢)",
		period: "١٩٧٣ - ١٩٧٧, ١٩٨٢",
		type: "مجلة أسبوعية",
	},
	panorama: {
		id: "panorama",
		nameAr: "بانوراما الخليج",
		nameEn: "Panorama Al Khaleej",
		description: "مجلة شهرية خليجية تأسست بمشاركة عقيل آل سوار (١٩٨٣)",
		period: "١٩٨٣",
		type: "مجلة شهرية",
	},
	aak: {
		id: "aak",
		nameAr: "أخبار الخليج",
		nameEn: "Akhbar Al Khaleej",
		description: "جريدة يومية بحرينية - عمود هواجس (١٩٨٦ - ١٩٩٦)",
		period: "١٩٨٦ - ١٩٩٦",
		type: "جريدة يومية",
	},
	alayam: {
		id: "alayam",
		nameAr: "الأيام",
		nameEn: "Al Ayam",
		description: "جريدة يومية بحرينية - عمود هواجس (١٩٩٧ - ٢٠٠٥)",
		period: "١٩٩٧ - ٢٠٠٥",
		type: "جريدة يومية",
	},
	alwatan: {
		id: "alwatan",
		nameAr: "الوطن",
		nameEn: "Al Watan",
		description: "جريدة يومية بحرينية - عمود هواجس وورش تدريبية (٢٠٠٥ - ٢٠١٢)",
		period: "٢٠٠٥ - ٢٠١٢",
		type: "جريدة يومية",
	},
};

// Dynamic import function for articles
async function getArticlesData(publisher) {
	try {
		// Try multiple import strategies
		let articlesModule;

		// Strategy 1: articles-{publisher}.json
		try {
			articlesModule = await import(`./data/index_${publisher}.json`);
			return articlesModule.default || [];
		} catch (e1) {
			// Strategy 2: {publisher}/articles.json
			try {
				articlesModule = await import(`./${publisher}/articles.json`);
				return articlesModule.default || [];
			} catch (e2) {
				// Strategy 3: generic articles.json
				try {
					articlesModule = await import(`./articles.json`);
					return articlesModule.default || [];
				} catch (e3) {
					console.warn(`No articles found for publisher: ${publisher}`);
					return [];
				}
			}
		}
	} catch (error) {
		console.error(`Error loading articles for publisher: ${publisher}`, error);
		return [];
	}
}

// Generate static params for all publishers
export async function generateStaticParams() {
	return Object.keys(publisherConfigs).map((publisher) => ({
		publisher,
	}));
}

// Generate metadata dynamically
export async function generateMetadata({ params }) {
	const resolvedParams = await params;
	const { publisher } = resolvedParams;
	const publisherConfig = publisherConfigs[publisher];

	if (!publisherConfig) {
		return {
			title: "الناشر غير موجود",
		};
	}

	return {
		title: `${publisherConfig.nameAr} - عقيل آل سوار`,
		description: `مقالات وكتابات عقيل آل سوار في ${publisherConfig.nameAr} - ${publisherConfig.description}`,
		keywords: [
			"عقيل آل سوار",
			publisherConfig.nameAr,
			publisherConfig.nameEn,
			"صحافة بحرينية",
			"مقالات",
			"هواجس",
		].join(", "),
		openGraph: {
			title: `${publisherConfig.nameAr} - عقيل آل سوار`,
			description: `مقالات وكتابات عقيل آل سوار في ${publisherConfig.nameAr}`,
			type: "website",
		},
		alternates: {
			canonical: `/journalism/${publisher}`,
		},
	};
}

export default async function PublisherDynamicPage({ params }) {
	const resolvedParams = await params;
	const { publisher } = resolvedParams;

	// Get publisher configuration
	const publisherInfo = publisherConfigs[publisher];

	// Return 404 if publisher doesn't exist
	if (!publisherInfo) {
		notFound();
	}

	// Load articles data
	const articles = await getArticlesData(publisher);

	return (
		<PublisherTemplate articles={articles} publisherInfo={publisherInfo} />
	);
}

// Loading component (optional - for better UX)
export function Loading() {
	return (
		<div className="publisher-loading" dir="rtl">
			<div className="container">
				<div className="publisher-loading__header">
					<div className="publisher-loading__breadcrumb skeleton"></div>
					<div className="publisher-loading__title skeleton"></div>
					<div className="publisher-loading__description skeleton"></div>
				</div>

				<div className="publisher-loading__filters">
					<div className="skeleton skeleton--select"></div>
					<div className="skeleton skeleton--select"></div>
				</div>

				<div className="publisher-loading__grid">
					{Array.from({ length: 12 }, (_, i) => (
						<div key={i} className="skeleton skeleton--card"></div>
					))}
				</div>
			</div>
		</div>
	);
}

// Error component (optional - for error boundaries)
export function Error({ error, reset }) {
	return (
		<div className="publisher-error" dir="rtl">
			<div className="container">
				<div className="publisher-error__content">
					<h2>حدث خطأ في تحميل الصفحة</h2>
					<p>عذراً، لم نتمكن من تحميل محتوى هذا الناشر.</p>
					<div className="publisher-error__actions">
						<button onClick={reset} className="btn btn--primary">
							إعادة المحاولة
						</button>
						<a href="/journalism" className="btn btn--secondary">
							العودة لصفحة الصحافة
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
