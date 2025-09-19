import React from "react";
import HeroSection from "../components/HeroSection/Component";
import Link from "next/link";
import "./publications.scss";

const publications = {
	holako: "هولاكو والأسرى الأربعة",
	rainbow: "حكاية قوس قزح",
	mawalat: "موالات بحرينية",
	makaka: "مكاكة عشق",
};

function Publications() {
	return (
		<main>
			<HeroSection page="publications" />
			<section className="content-section">
				<ul className="pub__link-container card-ul">
					{Object.keys(publications).map((name) => (
						<li key={name}>
							<Link href={"/publications/" + name}>{publications[name]}</Link>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Publications;
