import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlay } from "../data/plays";
import "../theatre.scss";

export default function PlayPage({ params }) {
	const play = getPlay(params.key);
	if (!play) return notFound();

	return (
		<main className="play" dir="rtl">
			<section className="content-section">
				<header className="play__header">
					<h1 className="play__title">{play.nameAR}</h1>
					<p className="play__year">{play.year}</p>
				</header>

				{play.cover && (
					<div className="play__cover">
						<Image
							src={play.cover}
							alt={`${play.nameAR} cover`}
							width={600}
							height={800}
						/>
					</div>
				)}

				{play.doc && (
					<div className="play__doc">
						<Link href={play.doc} target="_blank" rel="noopener noreferrer">
							عرض النص المسرحي
						</Link>
					</div>
				)}

				{play.video && (
					<div className="play__video">
						<iframe
							src={play.video}
							title={play.nameAR}
							allowFullScreen
						></iframe>
					</div>
				)}

				{play.images?.length > 0 && (
					<section className="play__gallery">
						<h2>الصور</h2>
						<div className="play__grid">
							{play.images.map((img, i) => (
								<Image
									key={i}
									src={img}
									alt={`${play.nameAR} image ${i + 1}`}
									width={300}
									height={200}
								/>
							))}
						</div>
					</section>
				)}

				{play.songs?.length > 0 && (
					<section className="play__songs">
						<h2>الأغاني</h2>
						<ul>
							{play.songs.map((song, i) => (
								<li key={i}>
									<audio controls src={song}></audio>
								</li>
							))}
						</ul>
					</section>
				)}
			</section>
		</main>
	);
}
