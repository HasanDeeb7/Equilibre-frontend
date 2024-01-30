import { useEffect, useState } from "react";
import style from "./Consultation.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import ActionModal from "../../components/ActionModal/ActionModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import DashboardModal from "../../components/dashboardModal/DashboardModal";
import ConsultationForm from "../../components/ConsultationForm/ConsultationForm"
function Consultation() {
  const [consultation, setConsultation] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState();
  const [target, setTarget] = useState(null);
  const [newConsultation, setNewConsultation] = useState({
    name: '',
  })

  //get al consutation
  async function getConsultations() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}consultation/`
      );
      if (response) {
        setConsultation(response.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

   //add consultation
   async function addConsultation() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}consultation/create`,
        { ...newConsultation },
      )
      if (response) {
        console.log(response.data)
        setMessage('Added Consultation')
        setModal("success")
        getConsultations()
        setConsultation({});
        setLoading(false)

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  //update Consultation
  async function updateConsultation() {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}consultation/update`,
        { ...target, id: target._id }
      );
      if (response) {
        console.log(response);
        setMessage("Consultation Updated");
        setModal("success");
        getConsultations();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error updating data");
    }
  }

  //delete consultation
  async function deleteConsultation() {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}consultation/delete/`,
        { params: { id: target._id } }
      );
      if (response) {
        console.log(response.data);
        setMessage("Consultation deleted ");
        setModal("success");
        getConsultations();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    getConsultations();
  }, []);
  const columns = [
    { field: "name", headerName: "Consultation Name", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "description", headerName: "Description", width: 600,

      renderCell: (params) => (
          <ul className={style.description}>
            {params.row.description.map((description, index) => (
              <li key={index} >-{description}</li>
            ))}
          </ul>
      ),
      type: 'string',

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
                updateConsultation();
              } else {
                addConsultation();
              }
            }}
          >
            <ConsultationForm
              consultation={target ? target : newConsultation}
              setConsultation={target ? setTarget : setNewConsultation}
            />
          </DashboardModal>
        ) : modal === "success" ? (
          <SuccessModal closeHandler={() => setModal(null)} message={message} />
        ) : modal === "action" ? (
          <ActionModal
            message="Are you sure you want to delete this Consultation"
            closeHandler={() => setModal(null)}
            action={() => deleteConsultation()}
          />
        ) : (
          ""
        )}
      <div className={style.consultationsContainer}>
        <div className={style.consultationsTable}>
        <button
              className={style.addBtn}
              onClick={() => {
                setTarget(null);
                setModal("form");
              }}
            >
              Add Consultation
            </button>
          <DataGrid
            rows={consultation}
            columns={columns}
            getRowId={(row) => row._id}
            getRowHeight={(params) => 100}
          />
        </div>
      </div>
      </>
    )
  );
}

export default Consultation;
