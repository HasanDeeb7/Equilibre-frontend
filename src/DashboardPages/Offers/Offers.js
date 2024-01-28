import { useEffect, useState } from "react";
import style from "./Offers.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function Offers() {
  const [offers, setOffers] = useState();
  const [globalOffers, setGlobalOffers] = useState();
  const [loading, setLoading] = useState(true);

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
      console.log(error);
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
              <h2>Global Offers</h2>
              <DataGrid
                rows={globalOffers}
                columns={globalOfferColumns}
                getRowId={(row) => row._id}
                autoHeight
              />
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Offers;
