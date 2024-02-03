import { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import style from "./ProductsModal.module.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

import axios from "axios";
function ProductsModal({
  closeHandler,
  onConfirm,
  title,
  product,
  setProduct,
  isEditing = false,
  toDelete,
}) {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [catOpen, setCatOpen] = useState(false);

  const handleSelectChange = (index, selectedUnit) => {
    const sizesCopy = [...product.sizes];
    sizesCopy[index].unit = selectedUnit;
    setProduct({ ...product, sizes: sizesCopy });
  };

  function handleConfirm() {
    // if(Object.values(product).some(item => item.value === '')){
    //   console.log(product)
    //  return  toast.error('All fields are required')
    // }
    onConfirm();
  }

  async function getCategories() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}category/`
      );
      if (response) {
        console.log(response.data);
        setCategories(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

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
  const removeSize = (index, id) => {
    if (product.sizes.length < 2) {
      return toast.error("A product should have at least one size");
    }
    console.log(toDelete);
    toDelete.push(id);
    const newSize = [...product.sizes];
    newSize.splice(index, 1);
    setProduct({ ...product, sizes: newSize });
  };

  return (
    !loading && (
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
            <div className={style.nameCatWrapper}>
              <section
                className={style.selectContainer}
                onClick={() => setCatOpen(!catOpen)}
                ref={dropDownRef}
              >
                {product.categoryName}
                <MdOutlineKeyboardArrowDown />

                <section className={style.catContainer}>
                  {catOpen &&
                    categories.map((item) => (
                      <span
                        className={style.option}
                        onClick={() => {
                          setProduct({ ...product, categoryName: item.name });
                          setCatOpen(false);
                        }}
                      >
                        {item.name}
                      </span>
                    ))}
                </section>
              </section>

              <Input
                value={product}
                setValue={setProduct}
                label="Product Name"
                control="name"
                required
              />
            </div>

            <div className={style.textareasWrapper}>
              <Input
                value={product}
                setValue={setProduct}
                label="Nutritional Info"
                control="nutritionalInfo"
                required
                tag="textarea"
              />

              <Input
                value={product}
                setValue={setProduct}
                label="Description"
                control="description"
                required
                tag="textarea"
              />
            </div>
            <div className={style.fileWrapper}>
              <input
                type="file"
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.files[0] })
                }
              />
            </div>
            <p>Sizes</p>
            <div className={style.sizesContainer}>
              {product.sizes.map((item, index) => (
                <div className={style.sizeInputs}>
                  <IoTrashOutline
                    className={style.trashIcon}
                    onClick={() => removeSize(index, item._id)}
                  />
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
              {!isEditing && (
                <section
                  className={style.addSizeBtn}
                  onClick={() => {
                    handleAddSize();
                  }}
                >
                  <span>Add Size</span>
                </section>
              )}
            </div>
            <div className={style.btnsContainer}>
              <button
                onClick={() => closeHandler()}
                className={style.cancelBtn}
              >
                Cancel
              </button>
              <button
                className={style.confirmBtn}
                onClick={(toDelete) => handleConfirm(toDelete)}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  );
}

export default ProductsModal;
