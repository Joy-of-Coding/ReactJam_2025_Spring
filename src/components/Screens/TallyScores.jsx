const TallyScores = ({ yourPlayerId, game }) => {
  if (!yourPlayerId || !game || !game.matches || !game.matches[yourPlayerId]) {
    return <div>No matches found for this player.</div>;
  }

  const matches = game.matches[yourPlayerId];

  return (
    <div>
      <h2>Matches for Player {yourPlayerId}</h2>
      <ul>
        {matches.length === 0 ? (
          <li>No matches recorded yet.</li>
        ) : (
          matches.map((match, index) => (
            <li key={index}>{JSON.stringify(match)}</li>
          ))
        )}
      </ul>
    </div>
  );
};
