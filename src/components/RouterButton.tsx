"use client"
import {useRouter} from "next/navigation";

const RouterButton = (
    props: { url: string; text: string;}
 ) => {
    const router = useRouter()
    const handleClick = () => {
        return router.push(props.url);
    };
    return (
        <>
            <button className={'router-btn'} onClick={handleClick}>{props.text}</button>
        </>
    )
}

export default RouterButton