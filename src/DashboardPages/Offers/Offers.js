import { useEffect, useState } from "react";
import style from "./Offers.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import { toast } from "react-toastify";
import ActionModal from "../../components/ActionModal/ActionModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import DashboardModal from "../../components/dashboardModal/DashboardModal";
import GlobalOfferForm from "../../components/GlobalOfferForm/GlobalOffer";

function Offers() {
  const [offers, setOffers] = useState();
  const [globalOffers, setGlobalOffers] = useState();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState();
  const [target, setTarget] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 5, page: 0 });
  const [newGlobalOffer, setNewGlobalOffer] = useState({
    title: "",
    rate: 0,
    startDate: "",
    endDate: "",
  });

  async function getOffers() {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/AllOffers`
      );
      if (response) {
        setOffers(response.data.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function getGlobalOffers() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}globalOffer/`
      );
      if (response) {
        setGlobalOffers(response.data);
        // setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.error);
      toast.error(error.error)
      setLoading(false);
    }
  }
  useEffect(() => {
    Promise.all([getOffers(), getGlobalOffers()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  async function addGlobalOffer() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}globalOffer/create`,
        { ...newGlobalOffer },
      )
      if (response) {
        console.log(response.data)
        setMessage('Added Global Offer')
        setModal("success")
        setNewGlobalOffer({
          title: "",
          rate: 0,
          startDate: "",
          endDate: "",
        });
        setLoading(false)

      }
    }
    catch (error) {
      
    }
  }


  const offersColumns = [
    { field: "discountRate", headerName: "Discount", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    {
      field: "product",
      headerName: "Product",
      width: 150,
      valueGetter: (params) =>
        params.row.products.length > 0 ? params.row.products[0].name : "",
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
  const globalOfferColumns = [
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
    { field: "title", headerName: "Title", width: 150 },
    { field: "rate", headerName: "Discount", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 150,
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
      <>
        <h1>Offers</h1>
        <div className={style.offersContainer}>
          <div className={style.offersTable}>
            <div>
              <h2>Single Offers</h2>
              <DataGrid
                rows={offers}
                columns={offersColumns}
                getRowId={(row) => row._id}
                autoHeight
              />
            </div>
            <div>
              {!loading && (
                <>
                  {modal === "form" ? (
                    <DashboardModal
                      title="GlobalOffer"
                      closeHandler={() => setModal(null)}
                      onConfirm={() => {
                        if (target) {
                          // updateCategory();
                        } else {
                          addGlobalOffer();
                        }
                      }}
                    >
                      <GlobalOfferForm
                        newGlobalOffer={target ? target : newGlobalOffer}
                        setNewGlobalOffer={target ? setTarget : setNewGlobalOffer}
                      />
                    </DashboardModal>
                  ) : modal === "success" ? (
                    <SuccessModal
                      closeHandler={() => setModal(null)}
                      message={message}
                    />
                  ) : modal === "action" ? (
                    <ActionModal
                      message="Are you sure you want to delete this Categorie"
                      closeHandler={() => setModal(null)}
                      // action={() => deleteCategory()}
                    />
                  ) : (
                    ""
                  )}

                  <div>
                    <h2>Global Offers</h2>
                    <button
                      className={style.addBtn}
                      onClick={() => {
                        setTarget(null);
                        setModal("form");
                      }}
                    >
                      Add
                    </button>
                    <DataGrid
                      rows={globalOffers}
                      columns={globalOfferColumns}
                      getRowId={(row) => row._id}
                      autoHeight
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Offers;
