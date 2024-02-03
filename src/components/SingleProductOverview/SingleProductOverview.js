import style from "./SingleProductOverview.module.css";
import { useEffect, useState } from "react";
import image from "../../assets/Hero2Eq2.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import Select from "../Select/Select";

function SingleProductOverview({ product }) {
  const [options, setOptions] = useState({
    quantity: null,
    size: { id: null, capacity: null },
  });
  const [stock, setStock] = useState();
  const [price, setPrice] = useState(product.sizes[0].price);
  const [offer, setOffer] = useState(product.offerId?.discountRate);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  const [selectedSize, setSelectedSize] = useState(options.size.quantity);
  const [inCart, setInCart] = useState(
    cartItems.some(
      (item) => item.name === product.name && item.size === product.capacity
    )
  );
  function handleChangeSize(item) {
    console.log(item);
    setOptions({
      quantity: 1,
      size: { id: item._id, capacity: item.capacity },
    });
    setPrice(item.price);
    setSelectedSize(item.capacity);
    setStock(item.stock);
  }
  function sortSizes() {
    return product.sizes.sort((a, b) => a.capacity - b.capacity);
  }

  function addToCart() {
    const newPrice = offer ? price * (1 - offer / 100) : price;
    console.log(options.size);
    console.log(cartItems);
    const index = cartItems.findIndex(
      (item) => item.name === product.name && options.size.id === item.size
    );
    if (index !== -1) {
      cartItems[index].quantity += options.quantity;
      cartItems[index].quantityPrice += newPrice * options.quantity;
      localStorage.setItem("Cart", JSON.stringify(cartItems));
      toast.success("Cart updated");
      return;
    }
    cartItems.push({
      ...product,
      quantity: options.quantity,
      size: options.size.id,
      price: newPrice,
      stock: stock,
      quantityPrice: newPrice * options.quantity,
      capacity: options.size.capacity,
    });
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    setInCart(true);
    toast.success("Item Added to Cart");
  }
  useEffect(() => {
    setOptions({
      quantity: 1,
      size: { id: product.sizes[0]?._id, capacity: product.sizes[0]?.capacity },
    });
    setStock(product.sizes[0]?.stock);
  }, []);
  return (
    <section className={style.overviewContainer}>
      <figure className={style.imageContainer}>
        <img src={product.image} alt={product.name} className={style.image} />
      </figure>
      <section className={style.productOverview}>
        <h1 className={style.productName}>{product.name}</h1>
        <p className={style.productPrice}>
          {offer ? (
            <span className={style.offer}>
              <span className={style.strokedPrice}>${price}</span>
              <span>${price * (1 - offer / 100)}</span>
            </span>
          ) : (
            <span>${price}</span>
          )}
        </p>
        <section className={style.availability}>
          <span>Availability: </span>

          {product.sizes?.some((item) => item.stock) ? (
            <p className={style.inStock}>
              {" "}
              <FaCheck style={{ marginRight: "5px" }} />
              In Stock
            </p>
          ) : (
            <p className={style.outOfStock}>Limit reached!</p>
          )}
        </section>
        <section className={style.description}>
          <span>
            {product.description}
          </span>
        </section>
        <section className={style.sizeContainer}>
          <span>Size: </span>
          <section className={style.sizeWrapper}>
            {sortSizes().map((item, index) => {
              return (
                <section
                  className={`${style.size} ${
                    selectedSize === item.capacity && style.activeSize
                  }`}
                  key={index}
                  onClick={() => handleChangeSize(item)}
                >
                  {item.capacity}
                  {item.unit}
                </section>
              );
            })}
          </section>
        </section>
        <section className={style.quantityWrapper}>
          <span>Quantity:</span>{" "}
          <Select length={stock} value={options} setValue={setOptions} />
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
