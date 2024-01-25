import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import StatisticsCard from '../../components/statisticsCard/StatisticsCard'
import product from '../../assets/confirmed.png'
import axios from 'axios'
import style from './Dashboard.module.css'
function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [dataCards, setDataCards] = useState({
    totalProductsSold: null,
    totalOrders: null,
    totalIncome: null,
  });

  const fetchDataCards = async () => {
    try {
      const [productsSold, totalOrders, totalIncome] = await Promise.all([
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-products-sold`),
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-orders`),
        axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/total-income`),
      ]);

      setDataCards({
        totalProductsSold: productsSold.data.totalProductsSold,
        totalOrders: totalOrders.data.data,
        totalIncome: totalIncome.data.data,
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
          <StatisticsCard title='Total Order' value={dataCards.totalOrders} unit='' imageSrc={product} />
          <StatisticsCard title='Total Income' value={dataCards.totalIncome} unit='$' imageSrc={product} />
        </section>
      )}
    </>
  );
}

export default Dashboard;
