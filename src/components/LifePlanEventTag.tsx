import React from "react";

const LifePlanEventTag = (props: { index: number; cx: number; cy: number; chartXOffset: number; age: number, enableDrag: boolean}) => {
    const {index, cx, cy, chartXOffset, age} = props
    return(
        <>
            <g className={props.enableDrag ? "svg-touch" : ""}>
                <circle
                    cx={cx + chartXOffset}
                    cy={cy}
                    r={10}
                    fill="#FF6400"/>
                <text
                    x={cx + chartXOffset}
                    y={cy}
                    textAnchor="middle"
                    dy="0.3em"
                    fill="#FFF"
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
        </>
    )
}
export default LifePlanEventTag