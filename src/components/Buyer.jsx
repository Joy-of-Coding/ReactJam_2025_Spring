const Buyer = ({ yourPlayerId, game }) => {
  if (!game || !game.personas || !yourPlayerId) {
    console.warn("Buyer.jsx: Game or player data is not yet available.");
    return null;
  }

  const persona = game.personas[yourPlayerId];

  console.log("Buyer Persona:", persona);

  return (
    <div>
      <h2>Buyer</h2>
      {persona ? (
        <>
          <p><strong>Role:</strong> {persona.nickName}</p>
          <p>{persona.description}</p>
          <p>{persona.budgetAmount}</p>
        </>
      ) : (
        <p>No persona assigned yet.</p>
      )}
    </div>
  );
};


export default Buyer