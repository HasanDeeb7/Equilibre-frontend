import { useEffect, useState } from "react";
import style from "./Categories.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}category/`
      );
      if (response) {
        setCategories(response.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  const columns = [
    { field: "name", headerName: "Category Name", width: 200 },
    { field: "products", headerName: "Related Products", width: 350,

    renderCell: (params) => (
        <ul className={style.products}>
          {params.row.products.map((product, index) => (
            <li key={index} >🟢{product.name}</li>
          ))}
        </ul>
      ),
      type: 'string',
    
},
{ field: "createdAt", headerName: "Created At", width: 200,}
,
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
      <div className={style.categoriesContainer}>
        <div className={style.categoriesTable}>
          <DataGrid
            rows={categories}
            columns={columns}
            getRowId={(row) => row._id}
            getRowHeight={(params) => 150} 
          />
        </div>
      </div>
    )
  );
}

export default Categories;
