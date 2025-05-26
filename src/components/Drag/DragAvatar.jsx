    // import React, { useState,  useEffect, useCallback, useRef } from "react";

    // const DragAvatar = ({ yourPlayerId, game }) => {
    // const draggingRef = useRef(false);

    //   // Helper to get (x, y) from MouseEvent or TouchEvent
    // const getEventPosition = (e) => {
    //     if (e.touches && e.touches[0]) {
    //         return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    //         } else {
    //         return { x: e.clientX, y: e.clientY };
    //         }
    //     };
        

    // const handleMouseDown = (e) => {
    //     Rune.actions.startDrag();
    //     draggingRef.current = true;
    // };

    // const handleMouseMove = (e) => {
    //     if (draggingRef.current) {
    //     Rune.actions.dragTo({ x: e.clientX, y: e.clientY });
    //     }
    // };

    // const handleMouseUp = () => {
    //     if (draggingRef.current) {
    //     Rune.actions.endDrag();
    //     draggingRef.current = false;
    //     }
    // };

        // const startDrag = (e) => {
        //     e.preventDefault();
        //     Rune.actions.startDrag();
        //     draggingRef.current = true;
        // };

        // const moveDrag = (e) => {
        //     if (draggingRef.current) {
        //     const { x, y } = getEventPosition(e);
        //     Rune.actions.dragTo({ x, y });
        //     }
        // };

        // const endDrag = () => {
        //     if (draggingRef.current) {
        //     Rune.actions.endDrag();
        //     draggingRef.current = false;
        //     }
        // };

    // useEffect(() => {
        // window.addEventListener("mousemove", handleMouseMove);
        // window.addEventListener("mouseup", handleMouseUp);
        // return () => {
        // window.removeEventListener("mousemove", handleMouseMove);
        // window.removeEventListener("mouseup", handleMouseUp);
        // };
        // window.addEventListener("mousemove", moveDrag);
        // window.addEventListener("mouseup", endDrag);
        // window.addEventListener("touchmove", moveDrag, { passive: false });
        // window.addEventListener("touchend", endDrag);

        // return () => {
        // window.removeEventListener("mousemove", moveDrag);
        // window.removeEventListener("mouseup", endDrag);
        // window.removeEventListener("touchmove", moveDrag);
        // window.removeEventListener("touchend", endDrag);
        // };
    // }, []);

    import React, { useEffect, useRef } from "react";

    const DragAvatar = ({ yourPlayerId, game }) => {
    const draggingRef = useRef(false);

    // Get the (x, y) from mouse or touch event
    const getEventPosition = (e) => {
        if (e.touches && e.touches[0]) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    };

    // Start dragging
    const startDrag = (e) => {
        e.preventDefault(); // prevent scrolling on touch
        Rune.actions.startDrag();
        draggingRef.current = true;

        const { x, y } = getEventPosition(e);
        Rune.actions.dragTo({ x, y });
    };

    // Drag move handler
    const moveDrag = (e) => {
        if (!draggingRef.current) return;
        const { x, y } = getEventPosition(e);
        Rune.actions.dragTo({ x, y });
    };

    // End dragging
    const endDrag = () => {
        if (!draggingRef.current) return;
        Rune.actions.endDrag();
        draggingRef.current = false;
    };

    // Attach mouse/touch move and end handlers
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
        {Object.entries(game.objects).map(([id, obj]) => (
            <div
            key={id}
            onMouseDown={yourPlayerId === id ? startDrag : null}
            onTouchStart={yourPlayerId === id ? startDrag : null}
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
                touchAction: "none", // disables default touch behavior like scrolling
            }}
            />
        ))}
        </div>
    );
    };

export default DragAvatar;
