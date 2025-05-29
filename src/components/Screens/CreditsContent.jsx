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
                    Linda Franklin (Linda Seriously), Project Admin<br />
                    Katrina Wright, Project Manager<br />
                    Shelly<br />
                    Abu H Kamal<br />
                    Mindi Briese, Developer<br />
                    Lisa Dean, officerjinxter<br />
                    Hope Barnett, Assistant Designer<br />
                    Rebecca A. Stone, Project Admin<br />
                    Jay Prox<br />
                    Anna Rankin, Developer<br />
                    Sam Crowe<br />
                    John Serwatka<br />
                    Susanne Atkinson<br />
                    Tonia Ellers, Tester<br />
                </>


				</ReadMore>
			{/* </h2> */}
		</div>
	);
};

export default CreditsContent;
