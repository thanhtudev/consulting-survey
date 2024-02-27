"use client"
import React, {useEffect, useState, useRef} from 'react';
import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import coordinatesData from "@/lib/life-plan-coordinator.json"
import BottomModal from "@/components/BottomModal";
import LifePlanEventTag from "@/components/LifePlanEventTag";
import {useRouter} from "next/navigation";

const scaledData = coordinatesData.map(([x, y]) => [x * 0.25, y * 0.2]);
const pathData = scaledData.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');

const LifePlan = () => {
    const data = localStorage.getItem('lifePlanData')
    const formData = localStorage.getItem('formData')
    const router = useRouter()
    if (!data) router.push('consulting')
    // @ts-ignore
    let lifePlanData = JSON.parse(data)
    const listAge = lifePlanData.map(lp => {
        return lp.age
    })
    lifePlanData = lifePlanData.map((item, index) => ({
        ...item,
        sequence: Date.now() + index
    }));
    // @ts-ignore
    const info =  JSON.parse(formData)
    const year = new Date().getFullYear()
    let start = (year - info.year) < 16 ? 16 : year - info.year
    let step = 5;
    let leftNumber = [start, 99];
    for (let i = 5; i <= 95; i += step) {
        leftNumber.push(i);
    }
    // State management grouped together
    const [draggedElement, setDraggedElement] = useState(null);
    const [draggedData, setDraggedData] = useState(null);
    const [showNumber, setShowNumber] = useState(listAge);
    const [lifePlan, setLifePlan] = useState(lifePlanData);
    useEffect(() => {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    }, []);
    // Array of node
    let circleIndices: {
        index: number;
        cx: number;
        cy: number;
        age: number;
        c: number;
        cyLeft: number;
        enableDrag: boolean;
        isShow: boolean;
        extra: number;
        plan: {};
    }[] = [];
    let distance = 0;

    const y = scaledData[scaledData.length - 1][1];
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
            const plan = lifePlan.filter(lp => {
                return lp.age === age
            })
            if (plan.length > 0) {
                plan.sort((a, b) => a.sequence - b.sequence);
                for (let j = 1; j < plan.length; j++) {
                    circleIndices.push({
                        index: j * 110,
                        cx: cx,
                        cy,
                        age,
                        c: c++,
                        cyLeft,
                        enableDrag: false,
                        plan: plan[j] || {},
                        isShow: showNumber.includes(age),
                        extra: j,
                    });
                }
            }
            circleIndices.push({
                index: i + 1,
                cx,
                cy,
                age,
                c: c++,
                cyLeft,
                enableDrag: false,
                plan: plan[0] || {},
                isShow: showNumber.includes(age),
                extra: 0
            });
            distance = 0;
        } else {
            distance += segmentDistance;
        }
    }
    const [circleIndicesData, updateCircleIndicesData] = useState(circleIndices)
    const chartXOffset = 30;

    // Function Drag and Drop
    // Function to handle the start of a drag operation
    let timeout: string | number | NodeJS.Timeout | undefined;
    const dragStart = (index: number) => {
        return (event: React.TouchEvent) => {
            // Start a timeout to delay the drag operation
            timeout = window.setTimeout(() => {
                if (circleIndicesData.length > circleIndices.length) {
                    circleIndices.push(circleIndicesData[circleIndicesData.length - 1])
                }
                const availableAge = circleIndicesData.map(e => {
                    if (e.isShow) {
                        return e.age
                    }
                }).filter((age): age is number => age !== undefined);
                setShowNumber(availableAge)
                const availableLifePlan = circleIndicesData.filter(e => Object.keys(e.plan).length !== 0 && e.isShow).map(e=> {
                    return e.plan = {
                        ...e.plan,
                        age: e.age,
                    }
                })
                setLifePlan(availableLifePlan)
                // Create a copy of circleIndices and update the dragged element's enableDrag property
                const updatedCircleIndices = [...circleIndicesData];
                updatedCircleIndices[index] = {...updatedCircleIndices[index], enableDrag: true};

                // Update the circleIndices state with the new array
                updateCircleIndicesData(updatedCircleIndices);

                // Retrieve and set the data for the dragged element
                const dragData = circleIndicesData[index];
                // @ts-ignore
                setDraggedData(dragData);
                // Set the event as the dragged element
                // @ts-ignore
                setDraggedElement(event);


            }, 500); // Delay of 500 milliseconds
            document.addEventListener('touchmove', lockScreen, {passive: false});
            document.addEventListener('touchend', cancelLockScreen());
            document.addEventListener('touchcancel', cancelLockScreen());
        };
    }


    const drag = (event: React.TouchEvent) => {
        if (!draggedElement || typeof draggedData?.c === 'undefined' || timeout) return;
        // Extract the clientY position of the touch event
        const {clientY} = event.touches[0];
        // Calculate the difference between the initial touch point and the current element's cy
        const initialTouchPoint = draggedElement.touches[0].clientY;
        const currentElementData = {...circleIndicesData[draggedData.c]};
        const verticalDiff = initialTouchPoint - currentElementData.cy;
        // Calculate the new cy position for the element being dragged
        const newCy = clientY - verticalDiff;

        // Find the target element based on the new cy position
        const dataTargetIndex = circleIndices.findIndex(({cy}) => newCy >= cy - 50 && newCy < cy);
        if (dataTargetIndex !== -1) {
            // Safely access the target element data
            const dataTarget = circleIndices[dataTargetIndex];
            // Hide the originally dragged element
            if (draggedData.c !== dataTarget.c) {
                // Filter circleIndices based on age and non-empty plan
                const matchingDataGroup = circleIndices.filter(item => item.age === draggedData.age && Object.keys(item.plan).length > 0);
                if (matchingDataGroup.length > 1) {
                    if (draggedData.extra > 0) {
                        circleIndices.forEach(item => {
                            if (item.c > draggedData.c) {
                                item.c -= 1;
                            }
                        });
                        circleIndices.splice(draggedData.c, 1);
                    } else {
                        matchingDataGroup.forEach(item => {
                            item.extra -= 1;
                        });
                        circleIndices[draggedData.c].isShow = false;
                        circleIndices[draggedData.c].plan = {};
                    }
                } else {
                    circleIndices[draggedData.c].isShow = false;
                }
                const dataTargetGroup = circleIndices.filter(d => d.age === dataTarget.age && d.extra >= 0)
                if (dataTarget.isShow && dataTargetGroup.length <= 1) {
                    const targetC = dataTarget.c
                    for (const data of circleIndices) {
                        if (data.c > targetC) {
                            circleIndices[data.c].c = data.c + 1
                        }
                    }
                    const newCircle = {
                        index: circleIndicesData[circleIndicesData.length -1].index + 1,
                        cx: dataTarget.cx,
                        cy: dataTarget.cy,
                        age: dataTarget.age,
                        c: targetC + 1,
                        cyLeft: dataTarget.cyLeft,
                        enableDrag: false,
                        plan: dataTarget.plan,
                        isShow: dataTarget.isShow,
                        extra: 0
                    }
                    circleIndices.splice(targetC + 1,0, newCircle)
                    dataTarget.extra = dataTargetGroup.length
                }
                else if (dataTargetGroup.length > 1) {
                    const target = dataTargetGroup.reduce((prev, current) => (prev.c > current.c) ? prev : current);
                    for (const data of circleIndices) {
                        if (data.c > target.c) {
                            circleIndices[data.c].c = data.c + 1
                        }
                    }
                    const newCircle = {
                        index: circleIndicesData[circleIndicesData.length -1].index + 1,
                        cx: target.cx,
                        cy: target.cy,
                        age: target.age,
                        c: target.c + 1,
                        cyLeft: target.cyLeft,
                        enableDrag: false,
                        plan: {...draggedData.plan, sequence: Date.now()},
                        isShow: target.isShow,
                        extra: 0
                    }
                    circleIndices.splice(target.c + 1,0, newCircle)
                    dataTargetGroup.forEach((item, index) => {
                        item.extra += 1
                    })
                    const newDataGroup = circleIndices.filter(d => d.age === dataTarget.age && d.extra >= 0).sort((a,b) => a.c -b.c)
                    const lastPlanData = {...newDataGroup[newDataGroup.length - 1]};
                    // Shift data from the end of the list to the beginning, starting from the second-to-last plan
                    for (let i = newDataGroup.length - 1; i > 0; i--) {
                        newDataGroup[i].plan = newDataGroup[i - 1].plan;
                    }
                    newDataGroup[0].plan = {...lastPlanData.plan, sequence: Date.now()};
                    newDataGroup[0].enableDrag = true;
                    return updateCircleIndicesData([...circleIndices]);
                }
            }

            // Update properties for the target element
            dataTarget.isShow = true;
            dataTarget.enableDrag = true;
            dataTarget.plan = {...draggedData.plan, sequence: Date.now()}
            updateCircleIndicesData([...circleIndices]);
        }
    };

    const drop = () => () => {
        clearTimeout(timeout);
        // Immutably update each element in circleIndicesData to disable dragging
        const updatedCircleIndicesData = circleIndicesData.map(i => ({
            ...i,
            enableDrag: false
        }));
        const extraIndex = updatedCircleIndicesData.findIndex(d => d.extra < 0)
        if (extraIndex !== -1) {
            updatedCircleIndicesData.splice(extraIndex,1)
            updatedCircleIndicesData.forEach(item => {
                if (item.c > extraIndex) {
                    item.c -= 1;
                }
            });
        }
        // Update the state with the new array
        updateCircleIndicesData(updatedCircleIndicesData);
        // Reset the dragged element state to null
        setDraggedElement(null);
        cancelLockScreen()
    };

    // Define the event listener function outside to ensure a consistent reference
    const lockScreen = (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
    };
    const cancelLockScreen = () => () => {
        document.removeEventListener('touchmove', lockScreen);
        document.removeEventListener('touchend', cancelLockScreen);
        document.removeEventListener('touchcancel', cancelLockScreen);
    }
    return (
        <>
            <Header step={2}/>
            <p>Đây là kế hoạch đề xuất cho cuộc đời bạn (Life plan)</p>
            <div className="life-plan-container" data-long-press-delay="500">
                <svg viewBox="0 0 400 3500">
                    <path d={pathData} fill="none" stroke="#C7C7CC" strokeWidth="1" strokeDasharray="5,5"
                          transform={`translate(${chartXOffset}, 0)`}/>
                    {circleIndicesData.map((plan, index) => (
                        <g key={index} onTouchStart={dragStart(plan.c)} onTouchMove={drag} onTouchEnd={drop()}>
                            {
                                leftNumber.includes(plan.age) && (
                                    <text x={15} y={plan.cyLeft} textAnchor="middle" dy="0.3em" fill="#C7C7CC"
                                          style={{fontSize: '10px'}}>&#x2022; {plan.age}</text>
                                )
                            }
                            <LifePlanEventTag plan={plan} chartXOffset={chartXOffset}/>
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
