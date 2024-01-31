import { useState } from "react";
import style from "./ProductForm.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";

function ProductForm({ product, setProduct }) {
  const [newSize, setNewSize] = useState({
    capacity: null,
    price: null,
    stock: null,
    unit: null,
  });

  return (
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
          style={{ marginBottom: "30px", zIndex: "90" }}
          onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
        />
      </div>
      <div className={style.sizesContainer}>
        <p>Sizes</p>
        <Input
          value={newSize}
          setValue={setNewSize}
          label="Capacity"
          control="capacity"
        />
        <Input
          value={newSize}
          setValue={setNewSize}
          label="Price"
          control="price"
        />
        <Input
          value={newSize}
          setValue={setNewSize}
          label="Stock"
          control="stock"
        />
        <Input
          value={newSize}
          setValue={setNewSize}
          label="Unit (g or Kg)"
          control="unit"
        />
        <p
          className={style.pushBtn}
          onClick={() => {
            setProduct({ ...product, sizes: [...product.sizes, newSize] });
            setNewSize({ capacity: 0, price: 0, stock: 0 });
          }}
        >
          Add Size
        </p>
      </div>
    </div>
  );
}

export default ProductForm;
