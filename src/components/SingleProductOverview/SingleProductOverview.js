import style from "./SingleProductOverview.module.css";
import { useEffect, useState } from "react";
import image from "../../assets/Hero2Eq2.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

function SingleProductOverview({ product }) {
  const [options, setOptions] = useState({
    quantity: null,
    size: null,
  });
  const [stock, setStock] = useState();
  const [price, setPrice] = useState(product.sizes[0].price);

  function addToCart() {
    console.log(options.quantity);
    const currentCart = JSON.parse(localStorage.getItem("Cart")) || [];
    currentCart.push({
      ...product,
      quantity: options.quantity,
      size: options.size,
      price: price,
      stock: stock,
      quantityPrice: price * options.quantity,
    });
    localStorage.setItem("Cart", JSON.stringify(currentCart));
    toast.success("Item Added to Cart");
  }

  function handleIncrease() {
    setOptions({ ...options, quantity: options.quantity + 1 });
  }
  function handleDecrease() {
    setOptions({ ...options, quantity: options.quantity - 1 });
  }
  useEffect(() => {
    setOptions({ quantity: 1, size: product.sizes[0]?.capacity });
    setStock(product.sizes[0]?.stock);
  }, []);
  return (
    <section className={style.overviewContainer}>
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
                  <div
                    key={index}
                    onClick={() => {
                      setOptions({
                        ...options,
                        size: item.capacity,
                      });
                      setPrice(item.price);
                      console.log(options);
                    }}
                  >
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
        <button className={style.addToCartBtn} onClick={addToCart}>
          <MdOutlineShoppingCart className={style.cartIcon} /> Add to cart
        </button>
      </section>
    </section>
  );
}

export default SingleProductOverview;
