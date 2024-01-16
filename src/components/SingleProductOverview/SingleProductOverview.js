import axios from "axios";
import style from "./SingleProductOverview.module.css";
import { useEffect, useState } from "react";
import image from "../../assets/Hero2Eq2.png";

function SingleProductOverview({ id }) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [control, setControl] = useState({
    increase: true,
    decrease: true,
  });
  function handleIncrease() {
    setControl({ ...control, decrease: true });
    setQuantity(quantity + 1);
  }
  function handleDecrease() {
    if (quantity <= 2) {
      setControl({ ...control, decrease: false });
    }
    setControl({ ...control, increase: true });
    setQuantity(quantity - 1);
  }
  async function getOneProduct() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/byId`,
        { params: { productId: id } }
      );
      if (response) {
        console.log(response.data);
        setProduct(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    !loading && (
      <section className={style.overviewContainer}>
        <figure>
          <img src={image} alt="" />
        </figure>
        <section className={style.productOverview}>
          <h1 className={style.productName}>{product.name}</h1>
          <p className={style.productPrice}>${product.price}</p>
          <span className={style.availabilityWrapper}>
            <p>Availability:</p>
            <span className={style.availabilityStatus}>In Stock</span>
          </span>
          <section className={style.description}>
            <span>
              Description:{" "}
              <span>
                {product.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit"}
              </span>
            </span>
          </section>
          <section className={style.sizeContainer}>
            <span>Size: </span>
            <section className={style.sizeWrapper}>
              <div>30</div>
              <div>40</div>
              <div>50</div>
            </section>
          </section>
          <section className={style.quantity}>
            <span>Quantity: </span>
            <section className={style.quantityControl}>
              <div
                className={`${style.decrease} ${
                  !control.decrease && style.disabledControl
                }`}
                onClick={handleDecrease}
              >
                -
              </div>
              <div className={style.currentQuantity}>{quantity}</div>
              <div
                className={`${style.increase} ${
                  !control.increase && style.disabledControl
                }`}
                onClick={handleIncrease}
              >
                +
              </div>
            </section>
          </section>
          <button className={style.addToCartBtn}>Add to cart</button>
        </section>
      </section>
    )
  );
}

export default SingleProductOverview;
