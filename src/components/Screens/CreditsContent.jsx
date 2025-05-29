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

				  <>
                    John Walter Kowal, Product Owner<br />
                    Linda Franklin (Linda Seriously), Project Manager<br />
                    Katrina Wright, Video Game Producer / Developer / AI wrangler<br />
                    Shelly<br />
                    Abu H Kamal<br />
                    Mindi Briese, Developer<br />
                    Lisa Dean, officerjinxter<br />
                    Hope Barnett, Assistant Designer<br />
                    Rebecca A. Stone, Project Manager / Lead Designer<br />
                    Jay Deguzman<br />
                    Anna Rankin, Developer<br />
                    Sam Crowe<br />
                    Susanne Atkinson, Project Consultant<br />
                    Tonia Ellers, Tester<br />
					Rick Osteen - JSON dev<br />
					Adre "yamahacello"
					Kai Pannu, Developer<br />
					Alyssa Dannielle<br />
					John Schlautman<br />
					Michelle Evans, Assistant Designer
                </>


				</ReadMore>
			{/* </h2> */}
		</div>
	);
};

export default CreditsContent;
