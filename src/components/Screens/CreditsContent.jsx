import React, { useState } from "react";
import "../styles/Content.css"

const ReadMore = ({ children }) => {
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<p className="text">
			{isReadMore ? text.slice(0, 11) : text}
			<span
				onClick={toggleReadMore}
				className="read-or-hide"
				style={{ color: "green" }}
			>
				{isReadMore ? "...read more" : " show less"}
			</span>
		</p>
	);
};


const CreditsContent = () => {
	return (
		<div className="container">
			{/* <h2> */}
				<ReadMore>
				  John Walter Kowal, Product Owner
				  Linda Franklin (Linda Seriously) Project Admin
					Katrina Wright, Project Manager
					Shelly
					Abu H Kamal
					Mindi Briese, Developer
					Lisa Dean, officerjinxter
					Hope Barnett, Assistant Designer
					Rebecca A. Stone, Project Admin
					Jay Prox
					Anna Rankin, Developer
					Sam Crowe
					John Serwatka
					Tonia Ellers, Tester

				</ReadMore>
			{/* </h2> */}
		</div>
	);
};

export default CreditsContent;
