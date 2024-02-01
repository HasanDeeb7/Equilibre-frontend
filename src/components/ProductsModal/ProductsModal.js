import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import style from "./ProductsModal.module.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
function ProductsModal({
  closeHandler,
  onConfirm,
  title,
  product,
  setProduct,
}) {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (index, selectedUnit) => {
    const sizesCopy = [...product.sizes];
    sizesCopy[index].unit = selectedUnit;
    setProduct({ ...product, sizes: sizesCopy });
    setIsOpen(false);
  };

  function handleAddSize() {
    if (
      !Object.values(product.sizes[product.sizes.length - 1]).some(
        (item) => !item || item === ""
      )
    ) {
      setProduct({
        ...product,
        sizes: [
          ...product.sizes,
          { capacity: "", stock: "", price: "", unit: "" },
        ],
      });
    } else {
      toast.error("All size data are required");
    }
  }
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const sizesCopy = [...product.sizes];
    sizesCopy[index][name] = value;
    setProduct({ ...product, sizes: sizesCopy });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn" }}
      className={style.modalContainer}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", delay: 0.3 }}
        className={style.modal}
      >
        <h2 className={style.modalTitle}>{title}</h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={style.formContainer}
        >
          <Input
            value={product}
            setValue={setProduct}
            label="Product Name"
            control="name"
            required
          />
          <Input
            value={product}
            setValue={setProduct}
            label="Category Name"
            control="categoryName"
            required
          />
          <Input
            value={product}
            setValue={setProduct}
            label="Nutritional Info"
            control="nutritionalInfo"
            required
          />
          <Input
            value={product}
            setValue={setProduct}
            label="Description"
            control="description"
            required
          />
          <div>
            <input
              type="file"
              style={{ marginBottom: "30px" }}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files[0] })
              }
            />
          </div>
          <p>Sizes</p>
          <div className={style.sizesContainer}>
            {product.sizes.map((item, index) => (
              <div className={style.sizeInputs}>
                <div className={style.inputWrapper}>
                  <input
                    className={`${style.loginInput} `}
                    type="number"
                    name="capacity"
                    value={item.capacity}
                    onChange={(e) => handleInputChange(index, e)}
                    // disabled={isDisabled}
                  />
                  {/* {required && <div className={style.requiredInput}></div>} */}
                  <label
                    className={`${style.loginInputLable} ${
                      item.capacity && style.inputActive
                    }`}
                  >
                    Capacity
                  </label>
                </div>
                <div className={style.inputWrapper}>
                  <input
                    className={`${style.loginInput} `}
                    type="number"
                    name="stock"
                    value={item.stock}
                    onChange={(e) => handleInputChange(index, e)}
                    // disabled={isDisabled}
                  />
                  {/* {required && <div className={style.requiredInput}></div>} */}
                  <label
                    className={`${style.loginInputLable} ${
                      item.stock && style.inputActive
                    }`}
                  >
                    Stock
                  </label>
                </div>
                <div className={style.inputWrapper}>
                  <input
                    className={`${style.loginInput} `}
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(index, e)}
                    // disabled={isDisabled}
                  />
                  {/* {required && <div className={style.requiredInput}></div>} */}
                  <label
                    className={`${style.loginInputLable} ${
                      item.price && style.inputActive
                    }`}
                  >
                    Price
                  </label>
                </div>
                <section
                  className={style.selectContainer}
                  onClick={() => setIsOpen(index)}
                  ref={dropDownRef}
                >
                  {item.unit}
                  <MdOutlineKeyboardArrowDown />
                  {isOpen === index && (
                    <section className={style.optionsContainer}>
                      <span
                        className={style.option}
                        name="g"
                        onClick={() => handleSelectChange(index, "g")}
                      >
                        g
                      </span>
                      <span
                        className={style.option}
                        onClick={() => handleSelectChange(index, "ml")}
                      >
                        ml
                      </span>
                    </section>
                  )}
                </section>
              </div>
            ))}
            <p
              className={style.addSizeBtn}
              onClick={() => {
                handleAddSize();
              }}
            >
              <span>Add Size</span>
            </p>
          </div>
          <div className={style.btnsContainer}>
            <button onClick={() => closeHandler()} className={style.cancelBtn}>
              Cancel
            </button>
            <button className={style.confirmBtn} onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProductsModal;
