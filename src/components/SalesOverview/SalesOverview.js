import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import axios from 'axios'




const SalesOverview = () => {

    const [sales, setSales] = useState([])
    const [isloading, setLoading] = useState(true)

    useEffect(() => {

        const fetching = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/sales-overview`)
                setSales(data.data.overviewSales.sort((a, b) => a.month - b.month))
                console.log(sales)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }

        }

        fetching();
    }, [])

    const data = {
        series: [
            {
                name: 'Total Quantity',
                data: sales.map(item => item.totalQuantity),
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
            colors: ["var(--primary-color"],
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
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep", "Oct", "Nov", "Dec"],
                title: {
                    text: "Month",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 5,
                max: 40,
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
        <div>
            {(isloading) ? <div>Loading....</div> : (
                <Chart
                    options={data.options}
                    series={data.series}
                    type="line"
                    height={350}
                    width={1000}
                />)}
        </div>
    );
}
export default SalesOverview;