import Link from "next/link";
import Image from "next/image";
import { plays } from "./data/plays"; // make sure you export plays array
import "./theatre.scss";
import HeroSection from "../components/HeroSection/Component";

export const metadata = {
	title: "المسرح | هواجس عقيل سوار",
	description: "أرشيف مسرح عقيل سوار.",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

export default function TheatreIndex() {
	return (
		<main className="theatre" dir="rtl">
			<HeroSection page="theatre" />
			<section className="content-section">
				<header className="theatre__header">
					<h1 className="theatre__title">الأعمال المسرحية</h1>
				</header>

				<div className="theatre__grid">
					{plays.map((play) => (
						<Link
							key={play.nameEN}
							href={`/theatre/${play.nameEN}`}
							className="theatre__card"
						>
							<div className="theatre__card-inner">
								{play.cover ? (
									<Image
										src={play.cover}
										alt={`${play.nameAR} cover`}
										width={300}
										height={400}
										className="theatre__card-image"
									/>
								) : (
									<div className="theatre__card-placeholder">
										<span>لا يوجد غلاف</span>
									</div>
								)}
								<div className="theatre__card-content">
									<h2 className="theatre__card-title">{play.nameAR}</h2>
									<p className="theatre__card-year">{play.year}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
