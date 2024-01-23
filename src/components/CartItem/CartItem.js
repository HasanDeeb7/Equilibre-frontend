import { useState } from "react";
import style from "./CartItem.module.css";

function CartItem({
  image,
  name,
  price,
  initialQuantity,
  initialStock,
  setSubtotal,
  subtotal,
  capacity,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [stock, setStock] = useState(initialStock);
  function handleIncrease() {
    setQuantity(quantity + 1);
    setSubtotal(subtotal + price);
  }
  function handleDecrease() {
    setQuantity(quantity - 1);
    setSubtotal(subtotal - price);
  }

  return (
    <section className={style.cartItem}>
      <section className={style.nameImageWrapper}>
        <figure>
          <img className={style.cartItemImage} src={image} alt={name} />
        </figure>
        <p className={style.itemName}>
          {name} {capacity}g
        </p>
      </section>
      <p className={style.price}>${price}</p>
      <section className={style.quantity}>
        <section className={style.quantityControl}>
          <div
            className={`${style.decrease} ${
              quantity <= 1 && style.disabledControl
            }`}
            onClick={handleDecrease}
          >
            -
          </div>
          <div className={style.currentQuantity}>{quantity}</div>
          <div
            className={`${style.increase} ${
              quantity >= stock && style.disabledControl
            }`}
            onClick={handleIncrease}
          >
            +
          </div>
        </section>
        <span className={style.stockIndicator}>
          {quantity >= stock && "Max Limit Reached!"}
        </span>
      </section>

      <p className={style.total}>${price * quantity}</p>
    </section>
  );
}

export default CartItem;
