import Link from "next/link";
import "./InterviewsPage.scss";

const interviews = [
	{
		file: "https://www.youtube.com/embed/WA1NjPIey3Q?si=FSlALFnrhFAvNJ_m",
		title: "ندوة تدشين الموقع الإلكتروني",
	},
	{
		file: "https://www.youtube.com/embed/mkMBu_hLKK8?si=orxjC0puDWA2QTgr",
		title: "التاريخ الشفهي",
	},
	{
		file: "https://www.youtube.com/embed/H77ZQLzjU-A?si=nG913kVUoYCTn4N9",
		title: "ندوة الإبحار مع عقيل سوار - برنامج ملفات عربية",
	},
	{
		file: "https://www.youtube.com/embed/geOOpkqA_Lc?si=g066nlE1mJymChJ4",
		title: "لقاء الجمعة مع إبراهيم بشمي (١٩٩٦)",
	},
	{
		file: "https://www.youtube.com/embed/1ANYos6abQY?si=TybHJQYUuB2MGFCB",
		title: "جمعية الصحفيين مع إيمان مرهون",
	},
];

export const metadata = {
	title: "حوارات | هواجس عقيل سوار",
	description: "أرشيف حوارات عقيل سوار.",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function InterviewsPage() {
	return (
		<main className="interviews-page" dir="rtl">
			{/* Header */}
			<header className="interviews-page__header">
				<div className="container">
					{/* Breadcrumb */}
					<nav className="interviews-page__breadcrumb" aria-label="مسار التنقل">
						<Link href="/" className="interviews-page__breadcrumb-link">
							الرئيسية
						</Link>
						<span className="interviews-page__breadcrumb-separator">←</span>
						<span className="interviews-page__breadcrumb-current">
							المقابلات
						</span>
					</nav>

					{/* Page Info */}
					<div className="interviews-page__intro">
						<h1 className="interviews-page__title">مقابلات وندوات</h1>
						<p className="interviews-page__description">
							مقابلات تلفزيونية وندوات شارك فيها عقيل سوار عبر السنوات
						</p>
					</div>
				</div>
			</header>

			{/* Interviews Grid */}
			<section className="interviews-page__content">
				<div className="container">
					<div className="interviews-page__grid">
						{interviews.map((interview, index) => (
							<article key={index} className="interviews-page__video-card">
								<div className="interviews-page__video-container">
									<iframe
										src={interview.file}
										className="interviews-page__video"
										title={interview.title}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
									/>
								</div>
								<div className="interviews-page__video-info">
									<h2 className="interviews-page__video-title">
										{interview.title}
									</h2>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
