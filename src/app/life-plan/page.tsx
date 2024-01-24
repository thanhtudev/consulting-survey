import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import React from "react";

const LifePlan = () => {
    return (
        <>
            <Header step={2}/>
            <h1 className='mb-12 text-6xl text-gray-900 dark:text-gray-100'>Life plan</h1>
            <RouterButton url={'report'} text={'Tiếp tục'}/>
        </>
    );
}

export default LifePlan
