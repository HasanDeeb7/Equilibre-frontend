import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import style from "./Cart.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmtyCart from "../../components/EmptyCart/EmptyCart";
import Loder from "../../components/LoderComponent/Loder";
function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  const [globalOffer, setGlobalOffer] = useState();
  const [loading, setLoading] = useState(true);
  async function getGlobalOffer() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}globalOffer/`
      );
      if (response) {
        const currentDate = new Date().toISOString().split("T")[0];

        const activeOffer = response.data.filter(
          (item) => currentDate < item.endDate.split("T")[0]
        );
        setGlobalOffer(activeOffer);
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  function checkOut() {
    localStorage.setItem(
      "totalPrice",
      JSON.stringify(
        globalOffer && globalOffer.length > 0
          ? (subtotal * (100 - globalOffer[0].rate)) / 100
          : subtotal
      )
    );
    navigate("/shipping");
  }
  function clearCart() {
    setCartItems(null);
    localStorage.removeItem("Cart", "");
    toast.success("Cart Cleared");
  }
  function handleDelete(id) {
    const currentItems = JSON.parse(localStorage.getItem("Cart")) || [];
    const index = currentItems.findIndex((item) => item._id === id);
    if (index !== -1) {
      currentItems.splice(index, 1);
      localStorage.setItem("Cart", JSON.stringify(currentItems));
      setCartItems(currentItems);
    }
  }
  useEffect(() => {
    getGlobalOffer();
    if (cartItems) {
      const totalQuantity = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantityPrice;
      }, 0);
      setSubtotal(totalQuantity);
    }
  }, [cartItems]);

  return loading ? (
    <section className={style.loadingComponent}>
      <Loder />
    </section>
  ) : cartItems.length < 1 ? (
    <EmtyCart />
  ) : (
    <section className={style.cartPageContainer}>
      <section className={style.cartItemsContainer}>
        <section className={style.cartItemsHeader}>
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </section>
        {cartItems && cartItems.length > 0 ? (
          <section className={style.items}>
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                capacity={item.capacity}
                capacityId={item.size}
                initialQuantity={item.quantity}
                initialStock={item.stock}
                setSubtotal={setSubtotal}
                subtotal={subtotal}
                id={item._id}
                handleDelete={handleDelete}
              />
            ))}
          </section>
        ) : (
          "No items in your cart"
        )}
      </section>
      <section className={style.actionsContainer}>
        <button onClick={clearCart} className={style.secondaryBtn}>
          Clear cart
        </button>
        <section className={style.proceedActionsContainer}>
          <section className={style.summaryWrapper}>
            <section className={style.subtotal}>
              <p>Subtotal</p>
              <span>
                {!globalOffer || !globalOffer.length > 0 ? (
                  <span>${subtotal}</span>
                ) : (
                  <span className={style.discountIndicator}>
                    <span className={style.strokedTotal}>${subtotal}</span>
                    <span>
                      ${(subtotal * (100 - globalOffer[0].rate)) / 100}
                    </span>
                  </span>
                )}
              </span>
            </section>
            <span className={style.shippingNote}>
              Tax and shipping cost will be calculated later
            </span>
          </section>
          <section className={style.buttonsContainer}>
            <button className={style.primaryBtn} onClick={checkOut}>
              Check out
            </button>
            <button
              className={style.primaryBtn}
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Cart;
