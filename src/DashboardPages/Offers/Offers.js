import { useEffect, useState } from "react";
import style from "./Offers.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import ActionModal from "../../components/ActionModal/ActionModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import DashboardModal from "../../components/dashboardModal/DashboardModal";
import GlobalOfferForm from "../../components/GlobalOfferForm/GlobalOffer";
import SingleOfferForm from "../../components/SingleOfferForm/SingleOfferForm";
function Offers() {
  const [singleOffers, setSingleOffers] = useState([]);
  const [globalOffers, setGlobalOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [OfferType, setOfferType] = useState('')
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

  const [newSingleOffer, setNewSingleOffer] = useState({
    discountRate: 0,
    startDate: "",
    endDate: "",
    products:[],
  });
  //singleOffer
  async function getSingleOffers() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}product/AllOffers`
      );
      if (response) {
        setSingleOffers(response.data.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
//add Single Offer
async function addSingleOffer() {
  try {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}product/addOffer`,
      { ...newSingleOffer },
    )
    if (response) {
      console.log(response.data)
      setMessage('Added Single Offer')
      setModal("success")
      getSingleOffers()
      setNewSingleOffer({
        discountRate: 0,
        startDate: "",
        endDate: "",
        products:[]
      });
      setLoading(false)

    }
  }
  catch (error) {
    console.log(error)
  }
}

//update Single Offer 
async function updateSingleOffers(){
  try {
    setLoading(true);
    const response = await axios.patch(
      `${process.env.REACT_APP_ENDPOINT}product/editOffer`,
      { ...target, id: target._id }
    );
    if (response) {
      console.log(response);
      setMessage("Single Offer Updated");
      setModal("success");
      getSingleOffers();
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("Error updating data");
  }
}

  //delete Single Offer
  async function deleteSingleOffer() {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}product/deleteOffer/`,
        { params: { id: target._id } }
      );
      if (response) {
        console.log(response.data);
        setMessage("Single Offer deleted ");
        setModal("success");
        getSingleOffers();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  /////////////////////////////////////////////////////////

  //get global Offer
  async function getGlobalOffers() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}globalOffer/`
      );
      if (response) {
        setGlobalOffers(response.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.error);
      toast.error(error.error)
      setLoading(false);
    }
  }


 //add Global Offer
  async function addGlobalOffer() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}globalOffer/create`,
        { ...newGlobalOffer },
      )
      if (response) {
        console.log(response.data)
        setMessage('Added Global Offer')
        setModal("success")
        getGlobalOffers()
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
      console.log(error)
      if(error.response){
        const errorMessage = error.response.data.error || 'Error occurred while processing the request';
        toast.error(errorMessage);
      }
    }
  }

  //update global Offer 
  async function updateGlobalOffers(){
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}globalOffer/update`,
        { ...target, id: target._id }
      );
      if (response) {
        console.log(response);
        setMessage("Global Offer Updated");
        setModal("success");
        getGlobalOffers();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error updating data");
    }
  }

    //delete Global Offer
    async function deleteGlobalOffer() {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_ENDPOINT}globalOffer/delete/`,
          { params: { id: target._id } }
        );
        if (response) {
          console.log(response.data);
          setMessage("Global Offer deleted ");
          setModal("success");
          getGlobalOffers();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  

 useEffect(() => {
    Promise.all([getSingleOffers(), getGlobalOffers()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);


  //single offer Grid
  const offersColumns = [
    { field: "discountRate", headerName: "Discount", width: 120 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "endDate", headerName: "End Date", width: 150 },
    {
      field: "product",
      headerName: "Product",
      width: 180,
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
            onClick={() => {
              setOfferType('singleOffer')
              setModal("form");
              setTarget(params.row);
            }}
          >
            Edit
          </button>
          <button
            className={style.deleteBtn}
            onClick={() => {
              setOfferType('singleOffer')
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

  //global Offer Grid
  const globalOfferColumns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "rate", headerName: "Discount", width: 120 },
    { field: "startDate", headerName: "Start Date", width: 120 },
    { field: "endDate", headerName: "End Date", width: 120 },
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
            onClick={() => {
              setOfferType('globalOffer')
              setModal("form");
              setTarget(params.row);
            }}
          >
            Edit
          </button>
          <button
            className={style.deleteBtn}
            onClick={() => {
              setOfferType('globalOffer')
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

{(OfferType === 'globalOffer') ? (
  modal === "form" ? (
    <DashboardModal
      title="Global Offer"
      closeHandler={() => setModal(null)}
      onConfirm={() => {
        if (target) {
          updateGlobalOffers()
        } else {
          addGlobalOffer();
        }
      }}
    >
      <GlobalOfferForm
        globalOffer={target ? target : newGlobalOffer}
        setGlobalOffer={target ? setTarget : setNewGlobalOffer}
      />
    </DashboardModal>
  ) : modal === "success" ? (
    <SuccessModal
      closeHandler={() => setModal(null)}
      message={message}
    />
  ) : modal === "action" ? (
    <ActionModal
      message="Are you sure you want to delete this Offer"
      closeHandler={() => setModal(null)}
      action={() => deleteGlobalOffer()}
    />
  ) : (
    null
  )
) : (
  (OfferType === 'singleOffer') ? (
    modal === "form" ? (
      <DashboardModal
        title="Single Offer" 
        closeHandler={() => setModal(null)}
        onConfirm={() => {
          if (target) {
            updateSingleOffers()
          } else {
            addSingleOffer();
          }
        }}
      >
        <SingleOfferForm
          singleOffer={target ? target : newSingleOffer}
          setSingleOffer={target ? setTarget : setNewSingleOffer}
        />
      </DashboardModal>
    ) : modal === "success" ? (
      <SuccessModal
        closeHandler={() => setModal(null)}
        message={message}
      />
    ) : modal === "action" ? (
      <ActionModal
        message="Are you sure you want to delete this Offer"
        closeHandler={() => setModal(null)}
        action={() => deleteSingleOffer()}
      />
    ) : (
      null
    )
  ) : null
)}
        <h1>Offers</h1>
        <div className={style.offersContainer}>
          <div className={style.offersTable}>
            <div>
              <h2>Single Offers</h2>
              <button
                className={style.addBtn}
                onClick={() => {
                  setOfferType('singleOffer')
                  setTarget(null);
                  setModal("form");
                }}
              >
                Add Single Offer
              </button>
              <DataGrid
                rows={singleOffers}
                columns={offersColumns}
                getRowId={(row) => row._id}
                autoHeight
              />
            </div>

        
              <div>
                <h2>Global Offers</h2>
                <button
                  className={style.addBtn}
                  onClick={() => {
                    setOfferType('globalOffer')
                    setTarget(null);
                    setModal("form");
                  }}
                >
                  Add Global Offer
                </button>
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
