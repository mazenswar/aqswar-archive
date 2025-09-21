import React from "react";
import PhotosList from "./PhotosList";

async function PhotoListPage({ params }) {
	const { category } = await params;
	const cat = {
		social: "مواقع التواصل الاجتماعية",
		aak: "أخبار الخليج",
	};

	return <PhotosList category={category} categoryAr={cat[category]} />;
}

export default PhotoListPage;
