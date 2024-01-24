import Header from "@/layouts/Header";
import React from "react";
import RouterButton from "@/components/RouterButton";

const Consulting = () => {
    return (
        <>
            <Header step={1}/>
            <form>
                <label><h3>Giới tính:</h3></label>
                <label><h3>Năm Sinh:</h3></label>
                <input type="number" id="year" name="year" required/>
                <label><h3>Nơi ở hiện tại:</h3></label>
                <input type="email" id="email" name="email" required/>
            </form>
            <RouterButton url={'life-plan'} text={'Tiếp tục'}/>
        </>
    );
}

export default Consulting
