import React, { useEffect, useRef } from "react";

const DragAvatar = ({ yourPlayerId, game }) => {
  const draggingRef = useRef(false);
  const actionQueue = useRef([]);
  const lastActionTime = useRef(0);

  // Process queued drag events
  useEffect(() => {
    const processQueue = () => {
      const now = Date.now();
      if (now - lastActionTime.current > 200 && actionQueue.current.length > 0) {
        const latestActionByPlayer = {};
        actionQueue.current.forEach(action => {
          latestActionByPlayer[action.yourPlayerId] = { x: action.x, y: action.y };
        });
        Object.entries(latestActionByPlayer).forEach(([playerId, { x, y }]) => {
          Rune.actions.dragTo({ x, y }, { yourPlayerId: playerId, game });
        });
        actionQueue.current = [];
        lastActionTime.current = now;
      }
      requestAnimationFrame(processQueue);
    };
    processQueue();
  }, []);

  const getEventPosition = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const startDrag = (e) => {
    e.preventDefault(); // prevent scroll during touch
    Rune.actions.startDrag();
    draggingRef.current = true;

    const { x, y } = getEventPosition(e);
    Rune.actions.dragTo({ x, y });
  };

  const moveDrag = (e) => {
    if (!draggingRef.current) return;
    const { x, y } = getEventPosition(e);
    actionQueue.current.push({ yourPlayerId, x, y });
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    Rune.actions.endDrag();
    draggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("touchend", endDrag);

    return () => {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, []);

  return (
    <div>
      {Object.entries(game.objects).map(([id, obj]) => {
        const player = Rune.getPlayerInfo(id);
        const avatarUrl = player?.avatarUrl || "/Salesman 9.png"; // ✅ Local fallback
        const isYou = yourPlayerId === id;

        return (
          <div
            key={id}
            onMouseDown={isYou ? startDrag : null}
            onTouchStart={isYou ? startDrag : null}
            style={{
              position: "absolute",
              left: obj.x - 25,
              top: obj.y - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              overflow: "hidden",
              cursor: isYou ? "grab" : "default",
              zIndex: 10,
              touchAction: "none",
              border: isYou ? "3px solid gold" : "3px solid white",
              backgroundImage: `url(${avatarUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#ccc", // fallback background color
            }}
          />
        );
      })}
    </div>
  );
};

export default DragAvatar;


