import React from "react";

function Section({ className, id, children }) {
	return (
		<section className={["block", className]} id={id}>
			<div className="block__content">{children}</div>
		</section>
	);
}

export default Section;
