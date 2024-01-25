"use client"
import Image from "next/image";
import logo from '@/assets/images/logo.svg'
import {useRouter} from "next/navigation";

const Header = (props:{step: number}) => {
    const router = useRouter()
    const handleClick = () => {
        return router.push('/');
    };
    const text = props.step >= 1 ? 'Bước ' + props.step + '/3' : ''
    return (
        <>
            <nav>
                <div className="logo" onClick={handleClick}>
                    <Image src={logo} alt={'Logo'}/>
                </div>
                <span className="nav-text"><h4>{text}</h4></span>
            </nav>
        </>
    )
}
export default Header