import React from "react";
import PhotosList from "./PhotoList";

async function PhotoListPage({ params }) {
	const { category } = await params;
	const cat = {
		personal: "صور شخصية",
		art: "لقطات فنية",
		event: "حفل تدشين الموقع",
	};
	return <PhotosList category={category} categoryAr={cat[category]} />;
}

export default PhotoListPage;
