"use client"
import React, {useEffect, useState, useCallback} from 'react';
import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import coordinatesData from "@/lib/life-plan-coordinator.json"
import BottomModal from "@/components/BottomModal";
import LifePlanEventTag from "@/components/LifePlanEventTag";

const LifePlan = () => {
    // useEffect(() => {
    //     document.addEventListener('contextmenu', function(e) {
    //         e.preventDefault();
    //     }, false);
    // }, []);
    let timeout: string | number | NodeJS.Timeout | undefined;
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
    const circleIndices: { index: number; cx: number; cy: number; age: number; c: number; enableDrag: boolean }[] = [];
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
            const age = start++
            circleIndices.push({ index: i + 1, cx, cy, age, c: c++, enableDrag: false });
            distance = 0;
        } else {
            distance += segmentDistance;
        }
    }
    const [circleIndicesData, updateCircleIndicesData] = useState(circleIndices)
    const chartXOffset = 30;


    const dragStart = (index) => (event: React.TouchEvent) => {
        timeout = window.setTimeout(function(){
            circleIndices[index].enableDrag = true
            updateCircleIndicesData(circleIndices)
            const dragData = circleIndicesData[index]
            setDraggedData(dragData);
            setDraggedElement(event);
            console.log(event.touches[0])
        },500)
    };

    const drag = (event: React.TouchEvent) => {
        if (draggedElement) {
            const { clientX, clientY } = event.touches[0];
            const dragData = circleIndices[draggedData.c]
            dragData.cy = clientY
            updateCircleIndicesData(circleIndices)
        }
        return showNumber
    };

    const drop = (index) => () => {
        clearTimeout(timeout);
        circleIndices.map(i=> {
                i.enableDrag = false
        })
        const index = showNumber.indexOf(31);
        // if (index > -1) { // only splice array when item is found
        //     showNumber.splice(index, 1); // 2nd parameter means remove one item only
        // }
        //showNumber.push(32)
        updateCircleIndicesData(circleIndices)
        return
    };
    return (
        <>
            <Header step={2}/>
            <p>Đây là kế hoạch đề xuất cho cuộc đời bạn (Life plan)</p>
            <div className="life-plan-container" data-long-press-delay="500">
                <svg viewBox="0 0 400 3500">
                    <path d={pathData} fill="none" stroke="#C7C7CC" strokeWidth="1" strokeDasharray="5,5" transform={`translate(${chartXOffset}, 0)`}/>
                    {circleIndicesData.map(({ index, cx, cy, age, enableDrag, c}) => (
                        <g key={index} onTouchStart={dragStart(c)} onTouchMove={drag} onTouchEnd={drop(index)}>
                            {
                                leftNumber.includes(age) && (
                                    <text x={15} y={cy} textAnchor="middle" dy="0.3em" fill="#C7C7CC" style={{ fontSize: '10px' }}>&#x2022; {age}</text>
                                )
                            }
                            {showNumber.includes(age) && (
                                <LifePlanEventTag enableDrag={enableDrag} index={c} cx={cx} cy={cy} chartXOffset={chartXOffset} age={age}/>
                            )
                            }
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
