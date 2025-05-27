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


const HowToContent = () => {
	return (
		<div className="container">
			{/* <h2> */}
				<ReadMore>
				How To Play:
				Outwit the salesperson and get your dream car to win!
                Click  "I am the Buyer" button:
                1. Click the "START GAME" button
                2. Choose your persona/charcter and hit that button
                3. Click "Confirm Choice" button
								4. Choose a car:
										click car
										click car price
										select features
								5. Click "Enter Contract" button if you have what your want.
								   Fill out fields
					         Click "Sign Contract" button.  ENDS game.
								6. Otherwise Click "Negotiate" button.


					OR

								Click  "I am the Seller" button:
                1. Click the "START GAME" button
                2. Choose cars you want to sell
								3. Set price
                3. Click "Confirm and Continue" button

                ** inspired by “Rune 'Tic-Tac-Toe” and built by Joy of Coding Academy students

				</ReadMore>
			{/* </h2> */}
		</div>
	);
};

export default HowToContent;