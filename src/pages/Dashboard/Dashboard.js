import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import StatisticsCard from '../../components/statisticsCard/StatisticsCard'
import order from '../../assets/order.png'
import product from '../../assets/confirmed.png'
import income from '../../assets/income.png'
import DonutChart from '../../components/DonutChart/DonutChart'

import axios from 'axios'
import style from './Dashboard.module.css'
import SalesOverview from '../../components/SalesOverview/SalesOverview'
function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [dataCards, setDataCards] = useState({
    totalProductsSold: null,
    totalOrders: null,
    totalIncome: null,
    totalUser:null
  });

  const fetchDataCards = async () => {
    try {
      const [productsSold, totalOrders, totalIncome,totalUser] = await Promise.all([
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-products-sold`),
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-orders`),
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-income`),
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-user`),

      ]);

      setDataCards({
        totalProductsSold: productsSold.data.totalProductsSold,
        totalOrders: totalOrders.data.data,
        totalIncome: totalIncome.data.data,
        totalUser:totalUser.data.data
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  
  useEffect(() => {
    fetchDataCards();
  }, []);



  return (
    <>
      {/* <Sidebar /> */}
      {isLoading ? (
        <div>loading....</div>
      ) : (
        <section className={style.cards}>
          <StatisticsCard title='Total Products Sold' value={dataCards.totalProductsSold} unit='' imageSrc={product} />
          <StatisticsCard title='Total Order' value={dataCards.totalOrders} unit='' imageSrc={order} />
          <StatisticsCard title='Total Income' value={dataCards.totalIncome} unit='$' imageSrc={income} />
          <StatisticsCard title='Total User' value={dataCards.totalUser} unit='' imageSrc={income} />

        </section>
      )}
      <SalesOverview/>
      <DonutChart/>
    </>
  );
}

export default Dashboard