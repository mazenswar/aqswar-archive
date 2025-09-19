import React from "react";
import HeroSection from "../components/HeroSection/Component.js";
import BioSection from "./BioSection.js";

function HomePage() {
	return (
		<main>
			<HeroSection page="home" />
			<BioSection />
		</main>
	);
}

export default HomePage;
