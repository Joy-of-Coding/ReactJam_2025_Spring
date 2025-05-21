import React from "react";
import CarList from "../CarList";
import Car from "../Car";
import Salesperson from "../Salesperson";
import Buyer from "../Buyer";
import Salesperson from "../Salesperson";

const NegotiationScreen = () => {
    return (
        <div className="negotiation-screen">
            <h2>Negotiation Phase</h2>
            <Salesperson />
            <Buyer />
            <CarList />
            {/*Creating a template */}
        </div>
    )
}

export default NegotiationScreen