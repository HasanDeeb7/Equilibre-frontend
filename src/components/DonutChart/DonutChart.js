import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'

const DonutChart = () => {
  const [sales, setSales] = useState([]);
  const [isloading, setLoading] = useState(true)

  useEffect(() => {

    const fetching = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/sales-by-category`)
        setSales(data.data.salesByCategory)
        console.log(sales)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }

    }

    fetching();
  }, [])

  // console.log(sales.map(item=>item.totalSales))
  const details = {
    series: sales.map(item => item.totalSales),
    options: {
      theme: {
        monochrome: {
          enabled: true, color: '#4CAF50',
        }
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
        position: 'bottom',
      },
      labels: sales.map(item => item.category),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            }

          },
        },
      ],
      responsive: [
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 350,
            }

          },
        },
      ],
    },
  }

  return (
    <div>
      {(isloading) ?
        (<div>Loading...</div>
        ) : (<ReactApexChart
          options={details.options}
          series={details.series}
          type="donut"
          width={500}
        />)}
    </div>
  );
};


export default DonutChart
