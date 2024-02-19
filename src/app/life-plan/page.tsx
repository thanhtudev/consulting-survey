"use client"
import React, {useEffect, useState, useCallback} from 'react';
import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import coordinatesData from "@/lib/life-plan-coordinator.json"
import BottomModal from "@/components/BottomModal";
import LifePlanEventTag from "@/components/LifePlanEventTag";

const LifePlan = () => {
    useEffect(() => {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
    }, []);

    const [draggedElement, setDraggedElement] = useState(null);
    const [draggedData, setDraggedData] = useState(null);
    const [showNumber, setShowNumber] = useState([31, 34, 35, 60, 65, 77, 98]);
    // input user age
    let start = 30
    // Fix coordinatesData
    const scaledData = coordinatesData.map(([x, y]) => [x * 0.25, y * 0.2]);
    // Line Data
    const pathData= scaledData.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
    // Array of node
    const circleIndices: { index: number; cx: number; cy: number; age: number; c: number; cyLeft: number; enableDrag: boolean ; isShow: boolean }[] = [];
    let distance = 0;

    const leftNumber = [30, 35, 40, 35, 50, 60, 65, 70, 75, 80, 85, 90, 95, 99]

    const y = scaledData[scaledData.length -1][1];
    const n = 99 - start // n la so life plan
    const d = y / n - 5  // -5 la ban kinh cua hinh tron
    let c = 0
    for (let i = 0; i < scaledData.length - 1; i++) {
        const [x1, y1] = scaledData[i];
        const [x2, y2] = scaledData[i + 1];
        const segmentDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (distance + segmentDistance >= d) {
            const remainingDistance = d - distance;
            const ratio = remainingDistance / segmentDistance;
            const cx = x1 + ratio * (x2 - x1);
            const cy = y1 + ratio * (y2 - y1);
            const cyLeft = y1 + ratio * (y2 - y1);
            const age = start++
            circleIndices.push({ index: i + 1, cx, cy, age, c: c++, cyLeft, enableDrag: false, isShow: showNumber.includes(age) });
            distance = 0;
        } else {
            distance += segmentDistance;
        }
    }
    const [circleIndicesData, updateCircleIndicesData] = useState(circleIndices)
    const chartXOffset = 30;

    // Function to handle the start of a drag operation
    let timeout: string | number | NodeJS.Timeout | undefined;
    const dragStart = (index: number) => (event: React.TouchEvent) => {
        // Start a timeout to delay the drag operation
        timeout = window.setTimeout(() => {
            // Create a copy of circleIndices and update the dragged element's enableDrag property
            const updatedCircleIndices = [...circleIndicesData];
            updatedCircleIndices[index] = { ...updatedCircleIndices[index], enableDrag: true };

            // Update the circleIndices state with the new array
            updateCircleIndicesData(updatedCircleIndices);

            // Retrieve and set the data for the dragged element
            const dragData = circleIndicesData[index];
            setDraggedData(dragData);

            // Set the event as the dragged element
            setDraggedElement(event);
        }, 500); // Delay of 500 milliseconds
    };


    const drag = (event: React.TouchEvent) => {
        if (!draggedElement || typeof draggedData?.c === 'undefined') return;

        // Extract the clientY position of the touch event
        const { clientY } = event.touches[0];

        // Calculate the difference between the initial touch point and the current element's cy
        const initialTouchPoint = draggedElement.touches[0].clientY;
        const currentElementData = {...circleIndicesData[draggedData.c]};
        const verticalDiff = initialTouchPoint - currentElementData.cy;

        // Calculate the new cy position for the element being dragged
        const newCy = clientY - verticalDiff;

        // Find the target element based on the new cy position
        const dataTargetIndex = circleIndices.findIndex(({ cy }) => newCy >= cy - 50 && newCy < cy);

        if (dataTargetIndex !== -1) {
            // Safely access the target element data
            const dataTarget = circleIndices[dataTargetIndex];

            // Update properties for the target element
            dataTarget.isShow = true;
            dataTarget.enableDrag = true;

            // Hide the originally dragged element
            circleIndices[draggedData.c].isShow = false;

            // Trigger the update with the modified circleIndices array
            updateCircleIndicesData([...circleIndices]);
        }
    };

    const drop = (index) => () => {
        clearTimeout(timeout);
        circleIndicesData.map(i=> {
                i.enableDrag = false
        })
        updateCircleIndicesData(circleIndicesData)
        setDraggedElement(null)
        ;return
}
    return (
        <>
            <Header step={2}/>
            <p>Đây là kế hoạch đề xuất cho cuộc đời bạn (Life plan)</p>
            <div className="life-plan-container" data-long-press-delay="500">
                <svg viewBox="0 0 400 3500">
                    <path d={pathData} fill="none" stroke="#C7C7CC" strokeWidth="1" strokeDasharray="5,5" transform={`translate(${chartXOffset}, 0)`}/>
                    {circleIndicesData.map(({ index, cx, cy, age, enableDrag, c, cyLeft, isShow}) => (
                        <g key={index} onTouchStart={dragStart(c)} onTouchMove={drag} onTouchEnd={drop(index)}>
                            {
                                leftNumber.includes(age) && (
                                    <text x={15} y={cyLeft} textAnchor="middle" dy="0.3em" fill="#C7C7CC" style={{ fontSize: '10px' }}>&#x2022; {age}</text>
                                )
                            }
                            <LifePlanEventTag enableDrag={enableDrag} index={c} cx={cx} cy={cy} chartXOffset={chartXOffset} age={age} isShow={isShow}/>
                        </g>
                    ))}
                </svg>
            </div>
            <BottomModal/>
            <RouterButton url={'report'} text={'Tiếp tục'}/>
        </>
    );
}

export default LifePlan
