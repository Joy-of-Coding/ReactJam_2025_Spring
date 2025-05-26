    import React, { useState,  useEffect, useRef } from "react";

    const DragAvatar = ({ yourPlayerId, game }) => {
    const draggingRef = useRef(false);
    
    
    const handleMouseDown = (e) => {
        Rune.actions.startDrag();
        draggingRef.current = true;
    };

    const handleMouseMove = (e) => {
        if (draggingRef.current) {
        Rune.actions.dragTo({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        if (draggingRef.current) {
        Rune.actions.endDrag();
        draggingRef.current = false;
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div>
        {Object.entries(game.objects).map(([id, obj]) => (
            <div
            key={id}
            onMouseDown={yourPlayerId === id ? handleMouseDown : null}
            style={{
                position: "absolute",
                left: obj.x,
                top: obj.y,
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "purple",
                cursor: yourPlayerId === id ? "grab" : "default",
                zIndex: 10,
            }}
            />
        ))}
        </div>
    );
    };


    export default DragAvatar;