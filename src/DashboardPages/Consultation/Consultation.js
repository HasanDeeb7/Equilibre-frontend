import { useEffect, useState } from "react";
import style from "./Consultation.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function Consultation() {
  const [consultation, setConsultation] = useState();
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    getConsultations();
  }, []);
  const columns = [
    { field: "name", headerName: "Consultation Name", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "description", headerName: "Description", width: 350,

    renderCell: (params) => (
        <ul className={style.description}>
          {params.row.description.map((description, index) => (
            <li key={index} >🟢{description}</li>
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
      <div className={style.consultationsContainer}>
        <div className={style.consultationsTable}>
          <DataGrid
            rows={consultation}
            columns={columns}
            getRowId={(row) => row._id}
            getRowHeight={(params) =>100} 
          />
        </div>
      </div>
    )
  );
}

export default Consultation;
