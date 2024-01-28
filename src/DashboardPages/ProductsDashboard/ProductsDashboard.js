import { useEffect, useState } from "react";
import style from "./ProductsDashboard.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function ProductsDashboard() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

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
          <img src={params.row.image} alt="" width={100} height={100} className={style.image} />
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
        params.row.sizes && params.row.sizes.length
          ? params.row.sizes[0].price
          : "N/A",
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
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div className={style.btnsContainer}>
          <button
            className={style.editBtn}
            // onClick={() => handleButtonClick(params.row)}
          >
            Edit
          </button>
          <button
            className={style.deleteBtn}
            // onClick={() => handleButtonClick(params.row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    !loading && (
      <div className={style.productsContainer}>
        <div className={style.productsTable}>
          <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row._id}
            getRowHeight={()=> 120}
            autoHeight
          />
        </div>
      </div>
    )
  );
}

export default ProductsDashboard;
