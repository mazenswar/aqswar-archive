import React from "react";
import HeroSection from "../components/HeroSection/Component.js";
import BioSection from "./BioSection.js";

export const metadata = {
	title: "هواجس عقيل سوار",
	description: "أرشيف أعمال عقيل سوار، الصحفي والكاتب المسرحي والمؤلف البحريني",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
};

function HomePage() {
	return (
		<main>
			<HeroSection page="home" />
			<BioSection />
		</main>
	);
}

export default HomePage;
