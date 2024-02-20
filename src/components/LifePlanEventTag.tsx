import React from "react";

const LifePlanEventTag = (props: { index: number; cx: number; cy: number; chartXOffset: number; age: number, enableDrag: boolean, isShow: boolean }) => {
    const {index, cx, cy, chartXOffset, age, enableDrag, isShow} = props;
    // Define an ID for the glow effect filter
    const glowEffectId = `glow-effect-${index}`; // Unique ID to ensure multiple instances don't conflict
    return (
        <>
            {/* Define the glow effect filter only if dragging is enabled */}
            {enableDrag && (
                <defs>
                    <filter id={glowEffectId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                        <feOffset dx="0" dy="1" result="offsetBlur"/>
                        <feFlood floodColor="rgba(255, 100, 0, 0.7)" result="flood"/>
                        <feComposite in="flood" in2="offsetBlur" operator="in" result="shadow"/>
                        <feMerge>
                            <feMergeNode in="shadow"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            )}
            <g filter={enableDrag ? `url(#${glowEffectId})` : ""} className={!isShow ? 'hidden' : ''}>
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
                <text
                    x={cx + chartXOffset + 60}
                    y={cy}
                    textAnchor="middle"
                    dy="0.3em"
                    fill="#FFF"
                    style={{fontSize: '10px'}}>Index: {index}
                </text>
            </g>
        </>
    );
}
export default LifePlanEventTag;
