import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'
import style from './DonutChart.module.css'
const DonutChart = () => {
  const [sales, setSales] = useState([]);
  const [isloading, setLoading] = useState(true)

  useEffect(() => {

    const fetching = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/sales-by-category`)
        setSales(data.data.salesByCategory)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }

    }

    fetching();
  }, [])
  console.log(sales)

  // console.log(sales.map(item=>item.totalSales))
  const details = {
    series: sales.map(item => item.totalSales),
    options: {
      theme: {
        monochrome: {
          enabled: true, color: '#4CAF50',
        }
      },
        title: {
            text: "Sales by category",
            align: "left",
        },
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      legend: {
        show: true,
        position: 'top',
        markers: {
          shape: 'square',
          radius: 0, 
          width:20
        },
      },
      labels: sales.map(item => item.category),
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              width: 200,
              height:300
            }

          },
        },
      ],
    },
  }

  return (
    <div className={style.DonutContainer} >
      {(isloading) ?
        (<div>Loading...</div>
        ) : (<ReactApexChart
          options={details.options}
          series={details.series}
          type="donut"
          className={style.Donut}
        />)}
    </div>
  );
};


export default DonutChart
