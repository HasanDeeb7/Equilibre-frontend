import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = () => {
  const [data,setData] = useState([]);

  const details= {
    series: [44, 55, 41],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  }

  return (
    <div>
        <ReactApexChart 
        options={details.options} 
        series={details.series} 
        type="donut" 
        width={500}
        />
    </div>
  );
};


export default DonutChart
