import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import style from './BarChart.module.css'
const BarChart = () => {
    const [ordersByAddress, setOrdersByAddress] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/orders-by-address`);
                setOrdersByAddress(response.data.ordersByAddress);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const details = {
        options: {
            plotOptions: {
                bar: {
                    distributed: true,
                },
            },
            title: {
                text: "Orders in Lebanon",
                align: "left",
            },
            colors: [
                '#3CB300',
                '#3CB371',
                '#008000',
                '#32CD32',
                '#3CB371',
            ],

            labels: ordersByAddress.map(item => item.city),
            legend: {
                show: false
            }
        },
        series: [
            {
                data: ordersByAddress.map(item => item.totalOrders)
            },
        ],

    }

    return (
        <div  className={style.barChartContainer}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ReactApexChart options={details.options} series={details.series} type="bar" height={350}className={style.BarChart}/>
            )}
        </div>
    );
};

export default BarChart;