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
    const [finalMoney, setFinalMoney] = useState(-1);
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
    let currentAge: number = data.age
    let planList: number[] = []
    let incomesList: any[] = []
    let totalLivingCost = 0
    let totalPlanCost = 0
    let riskValue = 0
    let maxValue = 0
    let riskList = Array(12).fill(0);
    if (activeAge >= 0) {
        riskValue = data?.expenses[activeAge * 2]?.treatmentCost || 0
        riskList[activeAge * 2] = riskValue
    }
    for (let i = 0; i < 6; i++) {
        const age = data.age + 10 * i
        if (age <= planDeath.age) {
            ageList.push(age)
        }
    }
    for (let i = 0; i < 12 ; i++) {
        const plan = lifePlan.filter((lp) => {
            if (i === 12) {
                return lp.age >= currentAge && lp.age <= ageDeath;
            }
            return lp.age >= currentAge && lp.age < currentAge + 5;
        });
        const livingCost  = data.livingCost * 5
        livingCostList.push(livingCost)
        let ratio = 0
        const planCost = plan.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.expectedCost;
        }, 0);
        if (currentAge <= ageDeath) {
            totalLivingCost += livingCost
            const incomeRatio = data.incomes.find(d => d.ageGroup === convertAgeToGroup(currentAge))
            ratio = incomeRatio.ratio
            totalPlanCost += planCost
        }
        if (planCost > livingCost) {
            planList.push(planCost - livingCost)
        } else {
            planList.push(planCost)
        }
        if (planList[i] + livingCost > maxValue) maxValue = planList[i] + livingCost
        incomesList.push(ratio)
        currentAge += 5;
    }
    const totalIncome = totalPlanCost + totalLivingCost
    incomesList = incomesList.map(icome => icome * totalIncome)
    let option = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                speed: 500,
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
        stroke: {
            width: [0, 0, 0, 3, 2],
            curve: 'monotoneCubic',
        },
        plotOptions: {
            bar: {
                borderRadius: 3,
            }
        },
        fill: {
            opacity: [1, 1, 1, 0.25, 1],
            type: ["solid","solid","gradient","solid","solid"],
            gradient: {
                type: "vertical",
                colorStops: [
                    {
                        offset: 0,
                        color: '#721A88',
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: '#F22F2F',
                        opacity: 1
                    }
                ]
            }
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
    }
    const [options, setOptions] = useState(option);

    let seriesData = [
        {
            name: 'light orange',
            type: 'column',
            data: livingCostList,
            color: function({dataPointIndex}) {
                if (dataPointIndex > activeAge * 2 - 1  && activeAge >= 0) {
                    return '#C7C7CC'
                } else {
                    return '#F89B6DFF'
                }
            },
        },
        {
            name: 'orange',
            type: 'column',
            data: planList,
            color: function({dataPointIndex}) {
                if (dataPointIndex > activeAge * 2 - 1 && activeAge >= 0) {
                    return '#AEAEB2'
                } else {
                    return '#FF0000'
                }
            },
        },
        {
            name: 'red',
            type: 'column',
            data: riskList,
        },
        {
            name: 'green',
            type: 'area',
            data: [],
            color: '#32E685'
        }, {
            name: 'blue',
            type: 'line',
            data: incomesList,
            color: '#007AFF',
        },
    ]

    const [series, setSeries] = useState(seriesData);
    useEffect(() => {
        setSeries(seriesData)
        setFinalMoney(totalIncome - totalPlanCost - totalLivingCost - riskValue)
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
                {riskList[activeAge * 2] > 0 && (
                    <div className="info-box-container second">
                        <div className="left-column">
                            <div className="box small-box gradient">
                                <div className="box-content-top">Chi phí điều trị bệnh ung thư (2 năm)</div>
                                <div className="box-content-mid">{formatCurrency(riskValue)}</div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="footer-box-container">
                    <div className="footer-box-title">Thiếu <span className={"txt-red"}>{formatCurrency(finalMoney)}</span></div>
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
