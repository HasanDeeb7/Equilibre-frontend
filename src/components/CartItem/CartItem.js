import { useState } from "react";
import style from "./CartItem.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import ActionModal from "../ActionModal/ActionModal";

function CartItem({
  image,
  name,
  price,
  initialQuantity,
  initialStock,
  setSubtotal,
  subtotal,
  capacity,
  id,
  capacityId,
  handleDelete,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [stock, setStock] = useState(initialStock);
  const [modalOpen, setModalOpen] = useState(false);
  const cartItems = JSON.parse(localStorage.getItem("Cart")) || [];
  function handleIncrease() {
    setQuantity(quantity + 1);
    setSubtotal(subtotal + price);
    console.log(capacityId);
    const index = cartItems.findIndex(
      (item) => item.name === name && capacityId === item.size
    );
    if (index !== -1) {
      console.log("first");
      cartItems[index].quantity += 1;
      cartItems[index].quantityPrice += price;
      localStorage.setItem("Cart", JSON.stringify(cartItems));
    }
  }
  function handleDecrease() {
    setQuantity(quantity - 1);
    setSubtotal(subtotal - price);
    const index = cartItems.findIndex(
      (item) => item.name === name && capacityId === item.size
    );
    if (index !== -1) {
      console.log("first");
      cartItems[index].quantity -= 1;
      cartItems[index].quantityPrice -= price;
      localStorage.setItem("Cart", JSON.stringify(cartItems));
    }
  }

  return (
    <>
      {" "}
      {modalOpen && (
        <ActionModal
          closeHandler={() => setModalOpen(false)}
          id={id}
          handleDelete={handleDelete}
        />
      )}
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
        <span className={style.delete} onClick={() => setModalOpen(true)}>
          <FaRegTrashAlt />
        </span>
      </section>
    </>
  );
}

export default CartItem;
