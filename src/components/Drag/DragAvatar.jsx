import React, { useEffect, useRef } from "react";
import React, { useEffect, useRef } from "react";

const DragAvatar = ({ yourPlayerId, game }) => {
const draggingRef = useRef(false);
const player = Rune.getPlayerInfo(yourPlayerId);
const avatarImage = player?.avatarUrl || "Salesman 9.png"; // Fallback avatar
const actionQueue = useRef([]);
const lastActionTime = useRef(0);

  // Process queued drag events
useEffect(() => {
    const processQueue = () => {
    const now = Date.now();
    if (now - lastActionTime.current > 200 && actionQueue.current.length > 0) {
        const latestActionByPlayer = {};

        // Keep only the latest action per player
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


  // Get the (x, y) from mouse or touch event
const getEventPosition = (e) => {
    if (e.touches && e.touches[0]) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
};

  // Start dragging
const startDrag = (e) => {
    e.preventDefault(); // prevents scroll during touch
    Rune.actions.startDrag();
    draggingRef.current = true;

    const { x, y } = getEventPosition(e);
    Rune.actions.dragTo({ x, y });
};

  // Drag move handler
const moveDrag = (e) => {
    if (!draggingRef.current) return;
    const { x, y } = getEventPosition(e);
    actionQueue.current.push({ yourPlayerId, x, y });
};

  // End dragging
const endDrag = () => {
    if (!draggingRef.current) return;
    Rune.actions.endDrag();
    draggingRef.current = false;
};

  // Only attach mouse listeners globally
useEffect(() => {
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", endDrag);

    return () => {
    window.removeEventListener("mousemove", moveDrag);
    window.removeEventListener("mouseup", endDrag);
    };
}, []);

return (
    <div>
    {Object.entries(game.objects).map(([id, obj]) => (
        <>
        
        <div
        key={id}
        onMouseDown={yourPlayerId === id ? startDrag : null}
        onTouchStart={yourPlayerId === id ? startDrag : null}
        onTouchMove={yourPlayerId === id ? moveDrag : null}
        onTouchEnd={yourPlayerId === id ? endDrag : null}
        style={{
            position: "absolute",
            left: obj.x - 25,
            top: obj.y - 25,
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundImage: `url(${avatarImage})`,
            // backgroundColor: "purple",
            cursor: yourPlayerId === id ? "grab" : "default",
            zIndex: 10,
            touchAction: "none", // disables scrolling during drag
        }}
        /> 
        <img
            src={player?.avatarUrl}
            alt={player?.displayName}
            style={{
                width: "20%",
                height: "20%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
            }}
            />
            </>
        ))}
    </div>
);
};

export default DragAvatar;

