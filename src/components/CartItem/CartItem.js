import { useState } from "react";
import style from "./CartItem.module.css";

function CartItem({ image, name, price, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  return (
    <section className={style.cartItem}>
      <section className={style.nameImageWrapper}>
        <figure>
          <img className={style.cartItemImage} src={image} alt={name} />
        </figure>
        <p className={style.itemName}>{name}</p>
      </section>
      <p className={style.price}>${price}</p>
      <p className={style.quantity}>{quantity}</p>
      <p className={style.total}>${price * quantity}</p>
    </section>
  );
}

export default CartItem;
