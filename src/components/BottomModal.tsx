"use client"
import {useState, useRef, useEffect} from "react";

const BottomModal = () => {
    const txtTotal = 'Tổng 4 tỷ'
    const txtTotalHeader = 'Tổng chi phí kế hoạch'

    const [showModal, setShowModal] = useState(false);
    const toggle = () => {
        setShowModal(!showModal)
    }
    const modalContent = useRef(null);

    useEffect(() => {
        const handleOutSideClick = (event: { target: any; }) => {
            // @ts-ignore
            if (!modalContent.current?.contains(event.target)) {
                setShowModal(false)
            }
        };
        window.addEventListener("mousedown", handleOutSideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [modalContent]);
    return (
        <>
            <div className="modal-button-container">
                <button className="modal-button" onClick={toggle}>{txtTotal}</button>
            </div>
            <div id="myModal" className={showModal ? "modal show" : "modal hide"}>
                <div ref={modalContent} className="modal-content">
                    <div className="modal-header">
                        <h2>{txtTotalHeader}</h2>
                    </div>
                    <div className="modal-body">
                        <table>
                            <tbody>
                            <tr>
                                <td><h3>Tổng chi phí</h3></td>
                                <td className='text-right'><h3>4 tỷ</h3></td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Đám cưới</td>
                                <td className='text-right'>100 triệu</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Sinh con</td>
                                <td className='text-right'>950 nghìn</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Mua nhà</td>
                                <td className='text-right'>2.5 tỷ</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Mua ô tô</td>
                                <td className='text-right'>500 triệu</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Sinh con</td>
                                <td className='text-right'>100 triệu</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Con đi học</td>
                                <td className='text-right'>1 tỷ</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Du lịch</td>
                                <td className='text-right'>50 triệu</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Du lịch</td>
                                <td className='text-right'>11 nghìn</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Kinh doanh</td>
                                <td className='text-right'>100 triệu</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Kinh doanh</td>
                                <td className='text-right'>0</td>
                            </tr>
                            </tbody>
                            <tbody>
                            <tr>
                                <td>Khác</td>
                                <td className='text-right'>0</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <h3></h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomModal