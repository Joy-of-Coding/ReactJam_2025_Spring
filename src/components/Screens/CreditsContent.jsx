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

 				  <><b>TechJoy Software ReactJammers:</b>
				    <br></br>
                    <br></br><b>John Walter Kowal</b>, Product Owner
                    <br></br><b>Linda Franklin (Linda Seriously)</b>, Project Manager
					<br></br><b>Rebecca A. Stone</b>, Project Manager / Lead Designer
                    <br></br><b>Abu H Kamal</b>, Developer
                    <br></br><b>Mindi Briese</b>, Developer
                    <br></br><b>Lisa Dean</b>, Developer
                    <br></br><b>Jay Deguzman</b>, Developer
                    <br></br><b>Anna Rankin</b>, Developer
                    <br></br><b>Tonia Ellers</b>, Developer / Tester
 					<br></br><b>Rick Osteen</b>, JSON Developer
 					<br></br><b>Andre "yamahacello"</b>, Developer
 					<br></br><b>Kai Pannu</b>, Developer
 					<br></br><b>Alyssa Dannielle</b>, Developer
 					<br></br><b>John Schlautman</b>, Developer/ AI Wrangler
					<br></br><b>Hope Barnett</b>, Assistant Designer
 					<br></br><b>Michelle Evans (Shelly)</b>, Assistant Designer
					<br></br><b>Dr. Susanne Atkinson</b>, Project Consultant
				    <br></br><b>Katrina Wright</b>, Video Game Producer / Developer / AI wrangler
                 </>

		</div>
	);
};

export default CreditsContent;
