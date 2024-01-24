"use client"
import Image from "next/image";
import logo from '@/assets/images/logo.png'

const Header = (props:{step: number}) => {
    const text = props.step >= 1 ? 'Bước ' + props.step + '/3' : ''
    return (
        <>
            <nav>
                <div className="logo">
                    <Image src={logo} alt={'Logo'}/>
                </div>
                <span className="nav-text"><b>{text}</b></span>
            </nav>
        </>
    )
}
export default Header