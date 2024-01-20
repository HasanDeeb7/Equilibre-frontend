import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import style from "./Cart.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || null
  );
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  function clearCart() {
    setCartItems(null);
    localStorage.removeItem("Cart");
    toast.success("Cart Cleared");
  }
  useEffect(() => {
    const totalQuantity = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantityPrice;
    }, 0);
    setSubtotal(totalQuantity);
  }, []);
  return !cartItems ? (
    <section>Cart is empty</section>
  ) : (
    <section className={style.cartPageContainer}>
      <section className={style.cartItemsContainer}>
        <section className={style.cartItemsHeader}>
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </section>
        <section className={style.items}>
          {cartItems.map((item) => (
            <CartItem
              image={item.image}
              name={item.name}
              price={item.price}
              initialQuantity={item.quantity}
              initialStock={item.stock}
              setSubtotal={setSubtotal}
              subtotal={subtotal}
            />
          ))}
        </section>
      </section>
      <section className={style.actionsContainer}>
        <button onClick={clearCart} className={style.secondaryBtn}>
          Clear cart
        </button>
        <section className={style.proceedActionsContainer}>
          <section className={style.summaryWrapper}>
            <section className={style.subtotal}>
              <p>Subtotal</p>
              <span>${subtotal}</span>
            </section>
            <span className={style.shippingNoe}>
              Tax and shipping cost will be calculated later
            </span>
          </section>
          <section className={style.buttonsContainer}>
            <button className={style.primaryBtn}>Check out</button>
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
