import Link from "next/link";
import "./mawwals.scss";
import HeroSection from "../components/HeroSection/Component";

const cat = {
	social: "مواقع التواصل الاجتماعية",
	aak: "أخبار الخليج",
};

export default function MawwalCategories() {
	// Get unique categories with Arabic name
	const categories = ["aak", "social"];

	return (
		<main className="mawwals" dir="rtl">
			<HeroSection page="mawwal" />
			<section className="content-section">
				<h1 className="mawwals__title">مواويل</h1>
				<ul className="mawwals__categories card-ul">
					{categories.map((slug) => (
						<li key={slug} className="mawwals__categories-item">
							<Link href={`/mawwal/${slug}`}>{cat[slug]}</Link>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
