// app/publications/[name]/page.js (Server Component)
import { notFound } from "next/navigation";
import PublicationViewer from "./PublicationViewer";

// Publication configurations
const publications = {
	holako: {
		nameAr: "هولاكو والأسرى الأربعة",
		nameEn: "Hulagu and the Four Prisoners",
		description:
			"كتاب في أدب الأطفال صادر عن دائرة ثقافة الأطفال التابعة لوزارة الثقافة والإعلام العراقية",
		category: "أدب الأطفال",
		fileName: "holako.pdf",
	},
	rainbow: {
		nameAr: "حكاية قوس قزح",
		nameEn: "The Rainbow Story",
		description:
			"كتاب في أدب الأطفال صادر عن دائرة ثقافة الأطفال التابعة لوزارة الثقافة والإعلام العراقية",
		category: "أدب الأطفال",
		fileName: "rainbow.pdf",
	},
	mawalat: {
		nameAr: "موالات بحرينية",
		nameEn: "Bahraini Mawaweel",
		description: "مجموعة من المواويل الشعبية البحرينية، الإصدار الأول عام ١٩٩٤",
		category: "مواويل شعبية",
		year: "١٩٩٤",
		fileName: "mawalat.pdf",
	},
	makaka: {
		nameAr: "مكاكة عشق",
		nameEn: "Makakat Ishq",
		description:
			"مجموعة من المواويل الشعبية صادرة عام ٢٠١٨ عن المؤسسة العربية للدراسات والنشر وهيئة البحرين للثقافة والآثار",
		category: "مواويل شعبية",
		year: "٢٠١٨",
		fileName: "makaka.pdf",
	},
};

// Generate metadata (Server Component function)
export async function generateMetadata({ params }) {
	const resolvedParams = await params;
	const { name } = resolvedParams;
	const publication = publications[name];

	if (!publication) {
		return {
			title: "المنشور غير موجود",
		};
	}

	return {
		title: `${publication.nameAr} - عقيل آل سوار`,
		description: `${publication.description}`,
		openGraph: {
			title: `${publication.nameAr} - عقيل آل سوار`,
			description: publication.description,
			type: "website",
		},
		alternates: {
			canonical: `/publications/${name}`,
		},
	};
}

// Generate static params (Server Component function)
export async function generateStaticParams() {
	return Object.keys(publications).map((name) => ({
		name,
	}));
}

// Server Component - handles routing and data
export default async function PublicationPage({ params }) {
	const resolvedParams = await params;
	const { name } = resolvedParams;
	const publication = publications[name];

	// Return 404 if publication doesn't exist
	if (!publication) {
		notFound();
	}

	// Construct S3 URL
	const pdfUrl = `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/publications/${publication.fileName}`;

	// Pass data to client component
	return <PublicationViewer publication={publication} pdfUrl={pdfUrl} />;
}
