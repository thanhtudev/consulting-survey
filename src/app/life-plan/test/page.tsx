import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import React from "react";

const Test = () => {
    return (
        <>
            <Header step={2}/>
            <p>Đây là kế hoạch đề xuất cho cuộc đời bạn (Life plan)</p>
            <svg height="200" width="500">
                <polyline points="20,20 40,25 60,40 80,120 120,140 200,180"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500">
                <defs>
                    <clipPath id="clip-Custom_Size_1">
                        <rect width="300" height="500"/>
                    </clipPath>
                </defs>
                <g id="Custom_Size_1" data-name="Custom Size – 1" className="cls-1">
                    <rect className="cls-6" width="300" height="500"/>
                    <path id="Path_1" strokeDasharray="3" data-name="Path 1" className="cls-2" d="M24.621,20.759s227.3-30.868,227.44,35S57.809,52.051,52.528,108.6s181.931,3.044,188.138,66.8c-2.136,14.672,16.033,76.56-78.386,56.463S42.461,229.014,47.672,265.7s213.89-23.538,204.39,63.023c-5.839,15.735,10.235,57.524-139.437,35.4-71.377-4.844-77.94,71.9-77.94,71.9" transform="translate(11 17)"/>
                    <g id="Ellipse_1" data-name="Ellipse 1" className="cls-3" transform="translate(20 25)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                    <g id="Ellipse_2" data-name="Ellipse 2" className="cls-3" transform="translate(248 51)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                    <g id="Ellipse_3" data-name="Ellipse 3" className="cls-3" transform="translate(46 103)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                    <g id="Ellipse_4" data-name="Ellipse 4" className="cls-3" transform="translate(232 162)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                    <g id="Ellipse_5" data-name="Ellipse 5" className="cls-3" transform="translate(46 235)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                    <g id="Ellipse_6" data-name="Ellipse 6" className="cls-3" transform="translate(232 300)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                    <g id="Ellipse_7" data-name="Ellipse 7" className="cls-3" transform="translate(51 384)">
                        <circle className="cls-4" cx="15.5" cy="15.5" r="15.5"/>
                        <circle className="cls-5" cx="15.5" cy="15.5" r="15"/>
                    </g>
                </g>
            </svg>
            <RouterButton url={'report'} text={'Tiếp tục'}/>
        </>
    );
}

export default Test
