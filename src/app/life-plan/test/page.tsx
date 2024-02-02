"use client"
import React, {useState} from "react";

const Test = () => {
    const [draggedElement, setDraggedElement] = useState(null);

    const dragStart = (evt) => {
        const el = evt.target;
        if (el.getAttribute('draggable') === 'true') {
            setDraggedElement(el);
        }
    };

    const drag = (evt) => {
        // evt.preventDefault();

        if (draggedElement) {
            const { clientX, clientY } = evt.touches[0];
            console.log(clientX, clientY)
            draggedElement.style.position = 'absolute';
            draggedElement.style.left = clientX - draggedElement.clientWidth / 2 + 'px';
            draggedElement.style.top = clientY - draggedElement.clientHeight / 2 + 'px';
        }
    };

    const drop = () => {
        if (draggedElement) {
            const dropbox = document.querySelector('#dropbox');
            const drg = draggedElement.getBoundingClientRect();
            const drp = dropbox.getBoundingClientRect();

            if (
                drp.top < drg.top &&
                drp.left < drg.left &&
                drp.bottom > drg.bottom &&
                drp.right > drg.right
            ) {
                dropbox.appendChild(draggedElement);
                draggedElement.style.position = '';
                draggedElement.setAttribute('draggable', 'false');
            }

            setDraggedElement(null);
        }
    };

    return (
        <>
            <div onTouchStart={dragStart} onTouchMove={drag} onTouchEnd={drop}>
                <div id="dropbox"></div>
                <div id="dragbox" draggable="true"></div>
            </div>
    </>
    );
};

export default Test;

