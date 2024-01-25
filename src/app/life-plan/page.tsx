import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import React from "react";

const LifePlan = () => {
    return (
        <>
            <Header step={2}/>
            <p>Đây là kế hoạch đề xuất cho cuộc đời bạn (Life plan)</p>
            <RouterButton url={'report'} text={'Tiếp tục'}/>
        </>
    );
}

export default LifePlan
