"use client"
import React from "react";
import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import coordinatesData from "@/lib/life-plan-coordinator.json"
import BottomModal from "@/components/BottomModal";

const LifePlan = () => {
    // input user age
    let start = 30
    // Fix coordinatesData
    const scaledData = coordinatesData.map(([x, y]) => [x * 0.25, y * 0.2]);
    // Line Data
    const pathData= scaledData.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
    // Array of node
    const circleIndices = [];
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
            circleIndices.push({ index: i + 1, cx, cy, age, c: c++ });
            distance = 0;
        } else {
            distance += segmentDistance;
        }
    }
    const chartXOffset = 30;

    const drag = (event: any) => {
        console.log("down", event)
    }
    const drop = (event: any) => {
        console.log("up", event)
    }

    return (
        <>
            <Header step={2}/>
            <p>Đây là kế hoạch đề xuất cho cuộc đời bạn (Life plan)</p>
            <div className="life-plan-container">
                <svg width="400" height="3500" xmlns="http://www.w3.org/2000/svg">
                    <path d={pathData} fill="none" stroke="#C7C7CC" strokeWidth="1" strokeDasharray="5,5" transform={`translate(${chartXOffset}, 0)`}/>
                    {circleIndices.map(({ index, cx, cy, age, c }) => (
                        <g key={index}>
                            {
                                leftNumber.includes(age) && (
                                    <text x={15} y={cy} textAnchor="middle" dy="0.3em" fill="#C7C7CC" style={{ fontSize: '10px' }}>&#x2022; {age}</text>
                                )
                            }
                            {[31, 34,35, 60, 65, 77,98].includes(age) && (
                                <>
                                    <g onMouseDown={drag} onMouseUp={drop}>
                                        <circle key={index} cx={cx + chartXOffset} cy={cy} r={10} fill="#FF6400"/>
                                        <text x={cx + chartXOffset} y={cy} textAnchor="middle" dy="0.3em" fill="#FFF"
                                              style={{fontSize: '10px'}}>{age}</text>
                                        <line
                                            x1={cx + chartXOffset + 10}
                                            y1={cy}
                                            x2={cx + chartXOffset + 30}
                                            y2={cy}
                                            stroke="#FF6400"
                                            strokeWidth="1"/>
                                        <rect
                                            x={cx + chartXOffset + 30 - 5}
                                            y={cy - 10}
                                            width="100"
                                            height="20"
                                            rx="4"
                                            ry="4"
                                            fill="#FF6400"/>
                                    </g>

                                </>)
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
