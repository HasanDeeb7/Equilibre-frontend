import React, { useState, useEffect } from 'react'
import style from './TopSellerDash.module.css'
import Loder from '../LoderComponent/Loder';
import axios from 'axios'
const TopSellerDash = () => {

    const [topSeller, setTopSeller] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}statistics/top-seller-product`);
                setTopSeller(response.data.topSellerProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(topSeller)

    return (
        <div className={style.containerSales}>
          {isLoading ? (
            <Loder/>
          ) : (
            <div className={style.allProduct}>
              <h4 className={style.title}>Top Seller</h4>
              <header className={style.header}>
                <h4>Product</h4>
                <h4>Total Sold</h4>
              </header>
              {topSeller.map(({ id, name, image, soldQuantityCounter },i) => (
                <section className={style.productCard} key={i}>
                  <figure>
                    <img alt={name} src={image} loading="lazy" width={57} />
                    <p>{name}</p>
                  </figure>
                  <p>{soldQuantityCounter}</p>
                </section>
              ))}
            </div>
          )}
        </div>
      );
}

export default TopSellerDash
