import React, { useState, useEffect } from 'react'
import StatisticsCard from '../../components/statisticsCard/StatisticsCard'
import DonutChart from '../../components/DonutChart/DonutChart'
import BarChart from '../../components/BarChart/BarChart'
import axios from 'axios'
import style from './OverView.module.css'
import SalesOverview from '../../components/SalesOverview/SalesOverview'
import TopSellerDash from '../../components/TopSellerDashboard/TopSellerDash'
import money from '../../assets/money.png'
import userDash from '../../assets/userDash.png'
import products from '../../assets/products.png'
import orders from '../../assets/orders.png'
import Loder from '../../components/LoderComponent/Loder'
function OverView() {
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
    <div className={style.container}>
    {isLoading ? (
    <Loder />
    ) : (
      <>
        <section className={style.cards}>
          <StatisticsCard title='Total Products Sold' value={dataCards.totalProductsSold} unit='' imageSrc={products} />
          <StatisticsCard title='Total Order' value={dataCards.totalOrders} unit='' imageSrc={orders} />
          <StatisticsCard title='Total Income' value={dataCards.totalIncome} unit='$' imageSrc={money} />
          <StatisticsCard title='Total User' value={dataCards.totalUser} unit='' imageSrc={userDash} />
        </section>
        <div className={style.section2}>
          <SalesOverview />
          <TopSellerDash />
        </div>
        <div className={style.section3}>
          <DonutChart />
          <BarChart />
        </div>
      </>
    )}
  </div>
  );
};

export default OverView;