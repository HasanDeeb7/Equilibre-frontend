import { useEffect, useState } from "react";
import style from "./ProductsDashboard.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ActionModal from "../../components/ActionModal/ActionModal";
import { toast } from "react-toastify";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ProductsModal from "../../components/ProductsModal/ProductsModal";

function ProductsDashboard() {
  const [title, setTitle] = useState();
  const [products, setProducts] = useState();
  const [newProduct, setNewproduct] = useState({
    name: "",
    sizes: [{ capacity: null, price: null, stock: null, unit: null }],
    categoryName: "",
    nutritionalInfo: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState();
  const [target, setTarget] = useState();
  const [toDelete, setToDelete] = useState([]);

  // async function deleteSize(ids){
  //   try {
  //     const response = await axios(`${process.env.REACT_APP_ENDPOINT}product/editSize`, {sizes: ids})
  //     if(response){
  //       updateProduct()
  //     }
  //   } catch (error) {

  //   }
  // }

  async function handleUpdateSizes() {
    setToDelete([]);
    console.log(toDelete);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}product/editSize`,
        { sizes: target.sizes, toDelete: toDelete }
      );
      if (response) {
        console.log(response.data);
        getProducts();
        updateProduct();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updateProduct() {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}product/editProduct`,
        target,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        console.log(response.data);
        getProducts();
        setModal("success");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getProducts() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/AllProducts`
      );
      if (response) {
        setProducts(response.data.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function deleteProduct() {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}product/deleteProduct`,
        { params: { productId: target } }
      );
      if (response) {
        setProducts(response.data.data);
        console.log(response.data);
        setModal("success");
        getProducts();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error deleting product");
    }
  }
  async function addSizes() {
    setToDelete([]);
    setTarget(null);
    setLoading(true);
    console.log(newProduct.sizes);
    if (!newProduct.sizes || newProduct.sizes.length < 1) {
      setLoading(false);
      return toast.error("Cannot create a product without a size");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}product/addSize`,
        { sizes: newProduct.sizes }
      );
      if (response) {
        addProduct(response.data.sizes);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function addProduct(sizes) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}product/addProduct`,
        { ...newProduct, sizes: sizes },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        setLoading(false);
        getProducts();
        setModal("success");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <figure>
          <img
            src={params.row.image}
            alt=""
            width={100}
            height={100}
            className={style.image}
          />
        </figure>
      ),
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "soldQuantityCounter", headerName: "Quantity Sold", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      valueGetter: (params) =>
        params.row.sizes &&
        params.row.sizes.length > 0 &&
        params.row.sizes[0].price,
    },
    {
      field: "size",
      headerName: "Sizes",
      width: 150,
      valueGetter: (params) => {
        if (params.row.sizes && params.row.sizes.length > 0) {
          const capacities = params.row.sizes.map((size) => size.capacity);
          return capacities.join(", ");
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "categoryId",
      headerName: "Category",
      width: 150,
      valueGetter: (params) => {
        return params.row.categoryId?.name;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div className={style.btnsContainer}>
          <button
            className={style.editBtn}
            onClick={() => {
              setModal("form");
              const newState = {
                ...params.row,
                sizes: params.row.sizes.map((size) => {
                  const { __v, ...newSize } = size;
                  return newSize;
                }),
              };
              const { __v, ...filtered } = newState;
              setTarget(filtered);
              setTitle("Edit Product");
            }}
          >
            Edit
          </button>
          <button
            className={style.deleteBtn}
            onClick={() => {
              setTarget(params.row._id);
              setModal("action");
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {modal === "form" ? (
        <ProductsModal
          closeHandler={() => {
            setModal(false);
            target
              ? setTarget(null)
              : setNewproduct({
                  name: "",
                  sizes: [
                    { capacity: null, price: null, stock: null, unit: null },
                  ],
                  categoryName: "",
                  nutritionalInfo: "",
                  description: "",
                  image: null,
                });
          }}
          onConfirm={target ? handleUpdateSizes : addSizes}
          title={title}
          product={target ? target : newProduct}
          setProduct={target ? setTarget : setNewproduct}
          isEditing={target ? true : false}
          toDelete={toDelete}
        />
      ) : modal === "action" ? (
        <ActionModal
          message={"Are you sure you want tot delete this product?"}
          closeHandler={() => setModal(null)}
          action={deleteProduct}
        />
      ) : modal === "success" ? (
        <SuccessModal closeHandler={() => setModal(null)} message={""} />
      ) : (
        ""
      )}
      {!loading && (
        <div className={style.productsContainer}>
          <div className={style.productsTable}>
            <button
              className={style.addBtn}
              onClick={() => {
                setModal("form");
                setTitle("Add a product");
              }}
            >
              Add Product
            </button>
            <DataGrid
              rows={products}
              columns={columns}
              getRowId={(row) => row._id}
              getRowHeight={() => 120}
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsDashboard;
