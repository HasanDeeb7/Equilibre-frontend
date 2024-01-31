import { useState } from "react";
import Input from "../Input/Input";
import style from "./ProductsModal.module.css";
import { motion } from "framer-motion";

function ProductsModal({
  closeHandler,
  onConfirm,
  title,
  product,
  setProduct,
}) {
  const [newSize, setNewSize] = useState({
    capacity: null,
    price: null,
    stock: null,
    unit: null,
  });
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
        <div className={style.formContainer}>
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
            <div className={style.sizeInputs}>
              <Input
                value={newSize}
                setValue={setNewSize}
                label="Capacity"
                control="capacity"
                className={style.sizeInput}
                required
                type="number"
              />
              <Input
                value={newSize}
                setValue={setNewSize}
                label="Price"
                control="price"
                required
                type="number"
              />
              <Input
                value={newSize}
                setValue={setNewSize}
                label="Stock"
                control="stock"
                required
                type="number"
              />
              <Input
                value={newSize}
                setValue={setNewSize}
                label="Unit (g or Kg)"
                control="unit"
                required
              />
            </div>
            <p
              className={style.addSizeBtn}
              onClick={() => {
                setProduct({ ...product, sizes: [...product.sizes, newSize] });
                setNewSize({ capacity: 0, price: 0, stock: 0 });
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
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductsModal;
