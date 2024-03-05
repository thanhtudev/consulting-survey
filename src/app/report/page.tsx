"use client"
import Header from "@/layouts/Header";
import RouterButton from "@/components/RouterButton";
import React, {useState, useEffect} from "react";
import Chart from 'react-apexcharts';
import {useRouter} from "next/navigation";
import formatCurrency from "@/ultils/currency";
import convertAgeToGroup from "@/ultils/convertAgeToGroup";

const Report = () => {
    const [activeTab, setActiveTab] = useState('NONE_INSURANCE');
    const [activeAge, setActiveAge] = useState(-1);
    const reportData = localStorage.getItem('reportData')
    const lifePlanData = localStorage.getItem('lifePlanData')
    const router = useRouter()
    if (!reportData) router.push('consulting')
    // @ts-ignore
    const data = JSON.parse(reportData)
    // @ts-ignore
    const lifePlan = JSON.parse(lifePlanData)
    const planDeath = lifePlan.find(lp => lp.key === 'DEATH')
    let [ageDeath, setAgeDeath] = useState(planDeath.age);

    let ageList: any[] = []
    let livingCostList: number[] = []
    let currentAge = data.age
    let planList: number[] = []
    let incomesList: any[] = []
    let totalLivingCost = 0
    let totalPlanCost = 0
    let maxValue = 0
    for (let i = 0; i < 6; i++) {
        const age = data.age + 10 * i
        if (age <= planDeath.age) {
            ageList.push(age)
        }
    }
    for (let i = 0; i < 12 && currentAge <= ageDeath; i++) {
        const livingCost  = data.livingCost * 5
        totalLivingCost += livingCost
        livingCostList.push(livingCost)
        const plan = lifePlan.filter((lp) => {
            if (i === 12) {
                return lp.age >= currentAge && lp.age <= ageDeath;
            }
            return lp.age >= currentAge && lp.age < currentAge + 5;
        });
         const planCost = plan.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.expectedCost;
        }, 0);
        totalPlanCost += planCost
        if (planCost > livingCost) {
            planList.push(planCost - livingCost)
        } else {
            planList.push(planCost)
        }
        if (planList[i] + livingCost > maxValue) maxValue = planList[i] + livingCost
        const incomeRatio = data.incomes.find(d => d.ageGroup === convertAgeToGroup(currentAge))
        incomesList.push(incomeRatio.ratio)
        currentAge += 5;
    }
    const totalIncome = totalPlanCost + totalLivingCost

    incomesList = incomesList.map(icome => icome * totalIncome)
    const [options, setOptions] = useState( {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                speed: 1000,
                animateGradually: {
                    enabled: true,
                    delay: 500
                },
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        grid: {
            borderColor: "#BDBDBD",
            strokeDashArray: 3,
        },
        colors: ['#F89B6DFF','#FF6400','#32E685','#007AFF'],
        stroke: {
            width: [0, 0, 3, 2],
            curve: 'smooth',
        },
        plotOptions: {
            bar: {
                borderRadius: 3,
            }
        },
        fill: {
            opacity: [1, 1, 0.25, 1],
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
        },
        yaxis: {
            labels: {
                show: true,
                align: 'right',
                maxWidth: 30,
                stepSize: 500000000,
                formatter: function(value) {
                    const val : number = Math.abs(value)
                    let str: string = ''
                    if (val >= 1000000000) {
                        str = (val / 1000000000).toFixed(1).replace('.0', '') + ' tỷ'
                    } else if (val >= 1000000) {
                        str = (val / 1000000).toFixed(0) + ' tr'
                    }
                    return str
                }
            },
            tickAmount: Number((maxValue / 500000000).toFixed(0)) + 2,
        },
    });

    let seriesData = [
        {
            name: 'light orange',
            type: 'column',
            data: livingCostList
        },
        {
            name: 'orange',
            type: 'column',
            data: planList
        },
        {
            name: 'green',
            type: 'area',
            data: []
        }, {
            name: 'blue',
            type: 'line',
            data: incomesList
        },
    ]

    const [series, setSeries] = useState(seriesData);
    useEffect(() => {
        setSeries(seriesData)
    }, [ageDeath]);
    const handleListAge =  (index: number) => {
       if (activeAge === index) {
           setActiveAge(-1)
           setAgeDeath(planDeath.age)
       } else  {
           setActiveAge(index)
           setAgeDeath(ageList[index])
       }
    }

    return (
        <>
            <Header step={3}/>
            <div className="header-container">
                <div onClick={()=> {setActiveTab('NONE_INSURANCE')}} className={activeTab === 'NONE_INSURANCE'? 'header-item active':'header-item'}>Không bảo hiểm</div>
                <div onClick={()=> {setActiveTab('INVESTMENT')}} className={activeTab === 'INVESTMENT'? 'header-item active':'header-item'}>Bảo hiểm Đầu tư</div>
                <div onClick={()=> {setActiveTab('EDUCATE')}} className={activeTab === 'EDUCATE'? 'header-item active':'header-item'}>Bảo hiểm Học vấn</div>
                <div onClick={()=> {setActiveTab('CI')}} className={activeTab === 'CI'? 'header-item active':'header-item'}>BH bệnh hiểm nghèo</div>
                <div onClick={()=> {setActiveTab('DEATH')}} className={activeTab === 'DEATH'? 'header-item active':'header-item'}>Bảo hiểm tử kỳ</div>
            </div>
            <div className="dashboard">
                <div className="header-container">
                    <div className="header-item txt-red">Trường hợp lý tưởng khi không tham gia bảo hiểm và không gặp phải bất kỳ bệnh hiểm nghèo/tai nạn.</div>
                </div>
                <div className="chart-container">
                    <Chart options={options} series={series} type="bar"/>
                    <ul className="age-list">
                        {
                            ageList.map((age, index) => {
                                return <li key={index} onClick={()=> {handleListAge(index)}} className={activeAge === index ? 'active': ''}>
                                    {age}
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="info-box-container">
                    <div className="left-column">
                        <div className="box small-box">
                            <div className="box-content-top">Chi phí kế hoạch</div>
                            <div className="box-content-mid">{formatCurrency(totalPlanCost)}</div>
                            <div className="box-content-bottom">Tổng chi phí cần thiết để hoàn thành tất cả kế hoạch cuộc đời</div>
                        </div>
                        <div className="box small-box light">
                            <div className="box-content-top">Chi phí sinh hoạt</div>
                            <div className="box-content-mid">{formatCurrency(totalLivingCost)}</div>
                            <div className="box-content-bottom">Tổng chi phí cần thiết để duy trì sinh hoạt cuộc sống cơ bản dựa trên thống kê</div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="box large-box">
                            <div className="box-content-top">Tổng thu nhập cần có</div>
                            <div className="box-content-mid">{formatCurrency(totalIncome)}</div>
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
