"use client"
import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import React, {useState} from "react";
import Chart from 'react-apexcharts';

const Report = () => {
    const [options, setOptions] = useState( {
        chart: {
            height: 350,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        colors: ['#FF6400','#32E685','#007AFF'],
        stroke: {
            width: [0, 1, 4],
            curve: 'smooth',
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
            }
        },
        fill: {
            opacity: [1, 0.25, 1],
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
            },
        },
        labels: [1,2,3,4,5,6,7,8,9,10,11,12],
        markers: {
            size: 0
        },
        xaxis: {
            labels: {
                show: false
            },
            axisTicks: {
                show: false,
            },
        }
    });

    const [series, setSeries] = useState([
        {
            name: 'A',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
            name: 'B',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        }, {
            name: 'C',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        },
    ]);
    return (
        <>
            <Header step={3}/>
            <div className="header-container">
                <div className="header-item active">Không bảo hiểm</div>
                <div className="header-item">Bảo hiểm Đầu tư</div>
                <div className="header-item">Bảo hiểm Học vấn</div>
                <div className="header-item">BH bệnh hiểm nghèo</div>
                <div className="header-item">Bảo hiểm tử kỳ</div>
            </div>
            <div className="dashboard">
                <div className="header-container">
                    <div className="header-item txt-red">Trường hợp lý tưởng khi không tham gia bảo hiểm và không gặp phải bất kỳ bệnh hiểm nghèo/tai nạn.</div>
                </div>
                <div className="chart-container">
                    <Chart options={options} series={series} type="bar"/>
                </div>

                <div className="info-box-container">
                    <div className="left-column">
                        <div className="box small-box">
                            <div className="box-content-top">Chi phí kế hoạch</div>
                            <div className="box-content-mid">4 tỷ</div>
                            <div className="box-content-bottom">Tổng chi phí cần thiết để hoàn thành tất cả kế hoạch cuộc đời</div>
                        </div>
                        <div className="box small-box light">
                            <div className="box-content-top">Chi phí sinh hoạt</div>
                            <div className="box-content-mid">2 tỷ</div>
                            <div className="box-content-bottom">Tổng chi phí cần thiết để duy trì sinh hoạt cuộc sống cơ bản dựa trên thống kê</div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="box large-box">
                            <div className="box-content-top">Tổng thu nhập cần có</div>
                            <div className="box-content-mid">6 tỷ</div>
                            <div className="box-content-bottom">Tổng thu nhập cần có để đảm bảo cho cả “Chi phí sinh hoạt” và “Chi phí kế hoạch”</div>
                        </div>
                    </div>
                </div>

                <div className="footer-box-container">
                    <div className="footer-box-title">Thiếu <span className={"txt-red"}>0</span> Tỷ</div>
                    <div className="footer-box-content">
                        Tổng thu nhập cần thiết để hoàn thành kế hoạch là 6 tỷ, không có dự phòng rủi ro
                    </div>
                </div>

            </div>
            <RouterButton url={'report'} text={'Hoàn thành'}/>
        </>
    );
}

export default Report
