'use client'
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Header from "@/layouts/Header";
import province from "@/lib/province.json"

const Consulting = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        gender: 'MALE',
        year: '',
        address: '',
    });
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        return router.push('life-plan')
    };

    return (
        <>
            <Header step={1}/>
            <form>
                <label><h3>Giới tính</h3></label>
                <div className="container">
                    <input type='radio' id='male' name='gender' value='MALE' checked={formData.gender === 'MALE'}
                           onChange={handleChange}/>
                    <label htmlFor='male'><i className="fa fa-mars fa-3x" aria-hidden="true"></i></label>
                    <input type='radio' id='female' name='gender' value='FEMALE' checked={formData.gender === 'FEMALE'}
                           onChange={handleChange}/>
                    <label htmlFor='female'><i className="fa fa-venus fa-3x" aria-hidden="true"></i></label>
                </div>
                <div className="container">
                    <label className='label-txt'>Nam</label>
                    <label className='label-txt'>Nữ</label>
                </div>
                <label><h3>Năm sinh</h3></label>
                <select id="year" name="year" value={formData.year} onChange={handleChange}>
                    <option value="">Năm sinh</option>
                    {Array.from({length: 99}, (_, index) => {
                        const year = new Date().getFullYear() - index;
                        return <option key={year} value={year}>{year}</option>;
                    })}
                </select>
                <label><h3>Nơi ở hiện tại</h3></label>
                <select id="address" name="address" value={formData.address} onChange={handleChange}>
                    <option value="">Tỉnh/Thành</option>
                    {
                        province.map((p) => {
                            return <option key={p.code} value={p.code}>{p.name}</option>;
                        })
                    }
                </select>
                <button type={"submit"} className={'router-btn'} onClick={handleSubmit}>Tiếp tục</button>
            </form>
        </>
    );
}

export default Consulting
