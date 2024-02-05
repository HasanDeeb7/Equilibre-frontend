import { useEffect, useState } from "react";
import style from "./Categories.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import ActionModal from "../../components/ActionModal/ActionModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import DashboardModal from "../../components/dashboardModal/DashboardModal";
import CategorieForm from "../../components/CategorieForm/CategorieForm";
function Categories() {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState();
  const [target, setTarget] = useState(null);
  const [pagination, setPagination] = useState({ pageSize: 5, page: 0 });
  const [newCategorie, setNewCategorie] = useState({
    name: '',
  })
  //get all categories
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

  //add categorie
  async function addCategorie() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}category/create`,
        { ...newCategorie },
      )
      if (response) {
        console.log(response.data)
        setMessage('Added Categorie')
        setModal("success")
        getCategories()
        setNewCategorie({ name: '' });
        setLoading(false)

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  //update categorieName
  async function updateCategory() {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}category/update`,
        { ...target, id: target._id }
      );
      if (response) {
        console.log(response);
        setMessage("Categorie Updated");
        setModal("success");
        getCategories();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error updating data");
    }
  }

  //delete categorie
  async function deleteCategory() {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}category/delete/`,
        { params: { id: target._id } }
      );
      if (response) {
        console.log(response.data);
        setMessage("Categorie deleted ");
        setModal("success");
        getCategories();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getCategories();
  }, []);


  const columns = [
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "products", headerName: "Related Products", width: 380,

      renderCell: (params) => (
        (params.row.products.length === 0) ? <div>No Products Added yet</div> :
          <ul className={style.products}>
            {params.row.products.map((product, index) => (
              <li key={index} >{index + 1}- {product.name}</li>
            ))}
          </ul>
      ),
      type: 'string',

    },
    { field: "createdAt", headerName: "Created At", width: 200, }
    ,
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
              setTarget(params.row);
            }}
          >
            Edit
          </button>
          <button
            className={style.deleteBtn}
            onClick={() => {
              setModal("action");
              setTarget(params.row);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    !loading && (
      <>
        {modal === "form" ? (
          <DashboardModal
            title="Categorie"
            closeHandler={() => setModal(null)}
            onConfirm={() => {
              if (target) {
                updateCategory();
              } else {
                addCategorie();
              }
            }}
          >
            <CategorieForm
              categorie={target ? target : newCategorie}
              setCategorie={target ? setTarget : setNewCategorie}
            />
          </DashboardModal>
        ) : modal === "success" ? (
          <SuccessModal closeHandler={() => setModal(null)} message={message} />
        ) : modal === "action" ? (
          <ActionModal
            message="Are you sure you want to delete this Categorie"
            closeHandler={() => setModal(null)}
            action={() => deleteCategory()}
          />
        ) : (
          ""
        )}
        <div className={style.categoriesContainer}>
          <h1>Products Categories</h1>
          <div className={style.categoriesTable}>
            <button
              className={style.addBtn}
              onClick={() => {
                setTarget(null);
                setModal("form");
              }}
            >
              Add Categorie
            </button>
            <DataGrid
              rows={categories}
              columns={columns}
              getRowId={(row) => row._id}
              getRowHeight={(params) => 100}
              paginationModel={pagination}
              pagination
              pageSizeOptions={[5, 10, 20, 50]}
              onPaginationModelChange={setPagination}
            />
          </div>
        </div>
      </>
    )
  );
}

export default Categories;
