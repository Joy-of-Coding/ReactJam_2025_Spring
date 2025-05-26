    import React, { useState,  useEffect, useRef } from "react";

    const DragAvatar = ({ yourPlayerId, game }) => {

        // const objects[yourPlayerId] = {
        //     id: playerId,
        //     x: 100 + index * 100,
        //     y: 100,
        //     draggable: true,
        //     heldBy: null,
        // };
        
    //     const handleMouseDown = () => {
    //         console.log("avatar start drag");
    //         Rune.actions.startDrag();
    //     };

    //     const handleMouseMove = (e) => {
    //         console.log("dragging avatar");
    //         Rune.actions.dragTo({ x: e.clientX, y: e.clientY });
    //     };

    //     const handleMouseUp = () => {
    //         console.log("avatar stop drag");
    //         Rune.actions.endDrag();
    //     };

    // return (
    //     <div>
    //     {Object.entries(game.objects).map(([id, obj]) => (
    //         <div
    //         key={id}
    //         onMouseDown={yourPlayerId === id ? handleMouseDown : null}
    //         onMouseMove={yourPlayerId === id ? handleMouseMove : null}
    //         onMouseUp={yourPlayerId === id ? handleMouseUp : null}
    //         style={{
    //             position: "absolute",
    //             left: obj.x,
    //             top: obj.y,
    //             width: 50,
    //             height: 50,
    //             borderRadius: "50%",
    //             backgroundColor: "lightblue",
    //             cursor: yourPlayerId === id ? "grab" : "default",
    //             zIndex: 10,
    //         }}
    //         >
    //         {/* <img src={Rune.getPlayerInfo(id).avatarUrl} alt="avatar" width="50" height="50" /> */}
    //         </div>
    //     ))}
    //     </div>
    // );
    // };

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
                backgroundColor: "lightblue",
                cursor: yourPlayerId === id ? "grab" : "default",
                zIndex: 10,
            }}
            />
        ))}
        </div>
    );
    };


    export default DragAvatar;