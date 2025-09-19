import React from "react";

import Image from "next/image";
import "./style.scss";
// home
import landingBg from "../assets/images/headers/landingBg.png";
import landingSm from "../assets/images/headers/landingSm.png";
//// photography
import photographySm from "../assets/images/headers/photographySm.png";
import photographyBg from "../assets/images/headers/photographyBg.png";
//// mawwal
import mawwalSm from "../assets/images/headers/mawwalSm.png";
import mawwalBg from "../assets/images/headers/mawwalBg.png";
//// journalism
import journalismSm from "../assets/images/headers/journalismSm.png";
import journalismBg from "../assets/images/headers/journalismBg.png";
//// publications
import publicationsSm from "../assets/images/headers/publicationsSm.png";
import publicationsBg from "../assets/images/headers/publicationsBg.png";
//// theatre
import theatreSm from "../assets/images/headers/theatreSm.png";
import theatreBg from "../assets/images/headers/theatreBg.png";

const heroImages = {
	home: { desktop: landingBg, mobile: landingSm, alt: "Landing page banner" },
	photography: {
		desktop: photographyBg,
		mobile: photographySm,
		alt: "Photography banner",
	},
	mawwal: { desktop: mawwalBg, mobile: mawwalSm, alt: "Mawwal banner" },
	journalism: {
		desktop: journalismBg,
		mobile: journalismSm,
		alt: "Journalism banner",
	},
	publications: {
		desktop: publicationsBg,
		mobile: publicationsSm,
		alt: "Publications banner",
	},
	theatre: { desktop: theatreBg, mobile: theatreSm, alt: "Theatre banner" },
};

function HeroSection({ page }) {
	const hero = heroImages[page];
	console.log(hero);
	if (!hero) return null; // fallback if page not in config
	return (
		<section className="hero__section">
			<picture>
				<source media="(max-width: 768px)" srcSet={hero.mobile.src} />
				<Image src={hero.desktop} alt={hero.alt} priority />
			</picture>
		</section>
	);
}

export default HeroSection;
