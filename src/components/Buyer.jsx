



const Buyer = ({ yourPlayerId, game }) => {
  const persona = game.personas?.[yourPlayerId];
  console.log("Rendering Buyer.jsx for", yourPlayerId);
  console.log("Persona for player:", game.personas?.[yourPlayerId]);

    if (!persona) return <p>Loading persona...</p>;

    return (
        <div>
            {console.log("Buyer Persona:", game.personas[yourPlayerId])}

            <h2>{persona.nickName} (Buyer)</h2>
            <p>{persona.description}</p>
        </div>
    )
}


export default Buyer