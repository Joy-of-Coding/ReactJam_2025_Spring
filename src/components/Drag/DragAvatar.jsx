    import React, { useState } from "react";

    const DragAvatar = ({ yourPlayerId, game }) => {
    const handleMouseDown = () => {
        console.log("avatar start drag");
        Rune.actions.startDrag();
    };

    const handleMouseMove = (e) => {
        console.log("dragging avatar");
        Rune.actions.dragTo({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        console.log("avatar stop drag");
        Rune.actions.endDrag();
    };

    return (
        <div>
        {Object.entries(game.objects).map(([id, obj]) => (
            <div
            key={id}
            onMouseDown={yourPlayerId === id ? handleMouseDown : null}
            onMouseMove={yourPlayerId === id ? handleMouseMove : null}
            onMouseUp={yourPlayerId === id ? handleMouseUp : null}
            style={{
                position: "absolute",
                left: obj.x,
                top: obj.y,
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "lightblue",
                cursor: yourPlayerId === id ? "grab" : "default",
                zIndex: 10,
            }}
            >
            <img src={Rune.getPlayerInfo(id).avatarUrl} alt="avatar" width="50" height="50" />
            </div>
        ))}
        </div>
    );
    };

    export default DragAvatar;