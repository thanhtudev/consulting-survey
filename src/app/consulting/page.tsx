'use client'
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Header from "@/layouts/Header";
import province from "@/lib/province.json";
import Consultations from "@/services/consultations"

const Consulting = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        gender: 'MALE',
        year: 0,
        address: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        // Example validation for year
        if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear()) {
            errors.year = "Please select a valid year.";
            formIsValid = false;
        }

        // Example validation for address
        if (!formData.address) {
            errors.address = "Please select your current location.";
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        // @ts-ignore
        if (errors[name]) {
            setErrors((prevErrors) => ({...prevErrors, [name]: undefined}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.error("Validation failed.");
            return;
        }


        const data = await Consultations.fetchLifePlanData(
            formData,
            function (response: any) {
                const res = response.data.docs
                localStorage.setItem('lifePlanData', JSON.stringify(res));
                localStorage.setItem('formData', JSON.stringify(formData));
                router.push('life-plan');
            }, function (e) {
                console.log(e)
            })
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
                {errors.year && <div className={"txt-red"}>{errors.year}</div>}
                <label><h3>Nơi ở hiện tại</h3></label>
                <select id="address" name="address" value={formData.address} onChange={handleChange}>
                    <option value="">Tỉnh/Thành</option>
                    {
                        province.map((p) => {
                            return <option key={p.code} value={p.code}>{p.name}</option>;
                        })
                    }
                </select>
                {errors.address && <div className={"txt-red"}>{errors.address}</div>}
                <button type={"submit"} className={'router-btn'} onClick={handleSubmit}>Tiếp tục</button>
            </form>
        </>
    );
}

export default Consulting
