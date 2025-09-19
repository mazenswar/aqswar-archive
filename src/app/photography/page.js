import Link from "next/link";
import "./photos.scss";
import HeroSection from "../components/HeroSection/Component";

const cat = {
	personal: "صور شخصية",
	art: "لقطات فنية",
	event: "حفل تدشين الموقع",
};

export default function PhotosCategories() {
	// Get unique categories with Arabic name
	const categories = ["personal", "art", "event"];

	return (
		<main className="photos" dir="rtl">
			<HeroSection page="photography" />
			<section className="content-section">
				<h1 className="photos__title">الألبومات</h1>
				<ul className="photos__categories card-ul">
					{categories.map((slug) => (
						<li key={slug} className="photos__categories-item">
							<Link href={`/photography/${slug}`}>{cat[slug]}</Link>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
