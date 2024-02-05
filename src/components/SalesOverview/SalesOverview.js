import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios'
import style from './SalesOverview.module.css'



const SalesOverview = () => {

    const [sales, setSales] = useState([])
    const [isloading, setLoading] = useState(true)

    useEffect(() => {

        const fetching = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/sales-overview`)
                setSales(data.data.overviewSales.sort((a, b) => a.month - b.month))
                setLoading(false)
            } catch (error) {
                console.log(error)
            }

        }

        fetching();
    }, [])
    console.log(sales)

    const data = {
        series: [
            {
                name: 'Total Quantity',
                // data:sales.map(item=>item.totalQuantity)
                data: [34,344,343,55,54,32],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2,
                },
                toolbar: {
                    show: true,
                },
            },
            colors:[ '#4CAF50'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Overview Sales",
                align: "left",
            },
            grid: {
                borderColor: "#e7e7e7",
                row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                },
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep", "Oct", "Nov", "Dec"],
            },
            yaxis: {
                title: {
                    text: "Sales",
                }
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
    };
    return (
        <div className={style.lineChartContainer} >
            {(isloading) ? <div>Loading....</div> : (
                <Chart
                    options={data.options}
                    series={data.series}
                    type="line"
                    height={400}
               className={style.Chart}
                />)}
        </div>
    );
}
export default SalesOverview;