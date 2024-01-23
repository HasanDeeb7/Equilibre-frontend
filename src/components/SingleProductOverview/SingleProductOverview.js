import style from "./SingleProductOverview.module.css";
import { useEffect, useState } from "react";
import image from "../../assets/Hero2Eq2.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function SingleProductOverview({ product }) {
  const [options, setOptions] = useState({
    quantity: null,
    size: { id: null, capacity: null },
  });
  const [stock, setStock] = useState();
  const [price, setPrice] = useState(product.sizes[0].price);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  const [inCart, setInCart] = useState(
    cartItems.some(
      (item) => item.name === product.name && item.size === product.capacity
    )
  );
  function handleChangeSize(item) {
    console.log(item);
    setOptions({
      ...options,
      size: { id: item._id, capacity: item.capacity },
    });
    setPrice(item.price);
    if (
      cartItems.some(
        (cartItem) =>
          cartItem.size === item.capacity && cartItem.name === product.name
      )
    ) {
      setInCart(true);
    } else {
      setInCart(false);
    }
    setOptions({ ...options, quantity: 1 });
  }
  function addToCart() {
    console.log(options.quantity);
    cartItems.push({
      ...product,
      quantity: options.quantity,
      size: options.size.id,
      price: price,
      stock: stock,
      quantityPrice: price * options.quantity,
    });
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    setInCart(true);
    toast.success("Item Added to Cart");
  }

  function handleIncrease() {
    setOptions({ ...options, quantity: options.quantity + 1 });
  }
  function handleDecrease() {
    setOptions({ ...options, quantity: options.quantity - 1 });
  }
  useEffect(() => {
    setOptions({
      quantity: 1,
      size: { id: product.sizes[0]?._id, capacity: product.sizes[0]?.capacity },
    });
    setStock(product.sizes[0]?.stock);
  }, []);
  return (
    <section
      // initial={{ translateX: 1800, opacity: 1 }}
      // animate={{ translateX: 0, opacity: 1 }}
      // exit={{ translateX: -1800, opacity: 0 }}
      // transition={{ delay: 0.5 }}
      className={style.overviewContainer}
    >
      <figure className={style.imageContainer}>
        <img src={image} alt={product.name} className={style.image} />
      </figure>
      <section className={style.productOverview}>
        <h1 className={style.productName}>{product.name}</h1>
        <p className={style.productPrice}>${price}</p>
        <section className={style.availability}>
          <span>Availability: </span>

          {product.sizes?.some((item) => item.stock) ? (
            <p className={style.inStock}>
              {" "}
              <FaCheck style={{ marginRight: "5px" }} />
              In Stock
            </p>
          ) : (
            <p className={style.outOfStock}>Out Of Stock</p>
          )}
        </section>
        <section className={style.description}>
          <span>
            {product.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit"}
          </span>
        </section>
        <section className={style.sizeContainer}>
          <span>Size: </span>
          <section className={style.sizeWrapper}>
            {product.sizes.map((item, index) => {
              return (
                <>
                  <div key={index} onClick={() => handleChangeSize(item)}>
                    {item.capacity}
                    {item.unit}
                  </div>
                </>
              );
            })}
          </section>
        </section>
        <section className={style.quantity}>
          <span>Quantity: </span>
          <section className={style.quantityControl}>
            <div
              className={`${style.decrease} ${
                options.quantity <= 1 && style.disabledControl
              }`}
              onClick={handleDecrease}
            >
              -
            </div>
            <div className={style.currentQuantity}>{options.quantity}</div>
            <div
              className={`${style.increase} ${
                options.quantity >= stock && style.disabledControl
              }`}
              onClick={handleIncrease}
            >
              +
            </div>
          </section>
          <span className={style.stockIndicator}>
            {options.quantity >= stock && "Out of stock!"}
          </span>
        </section>
        {!inCart ? (
          <button className={style.addToCartBtn} onClick={addToCart}>
            <MdOutlineShoppingCart className={style.cartIcon} /> Add to cart
          </button>
        ) : (
          <button className={style.addToCartBtn} onClick={addToCart}>
            <MdOutlineShoppingCart className={style.cartIcon} /> Add One more
          </button>
        )}
      </section>
    </section>
  );
}

export default SingleProductOverview;
