import { useState, useEffect } from "react";

export default function useCountdown(game) {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (!game?.countdownActive || !game?.countdownStart) {
      setRemainingTime(null);
      return;
    }

    const timerId = setInterval(() => {
      const elapsed = Rune.gameTime() - game.countdownStart;
      const timeLeft = Math.max(0, Math.ceil((game.countdownDuration - elapsed) / 1000));
      setRemainingTime(timeLeft);
    }, 100);

    return () => clearInterval(timerId);
  }, [game?.countdownActive, game?.countdownStart, game?.countdownDuration]);

  return remainingTime;
}
