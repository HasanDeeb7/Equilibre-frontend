import { useEffect, useState } from "react";
import style from "./TestimonialsDashboard.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState();
  const [loading, setLoading] = useState(true);

  async function getTestimonials() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}testimonial/`
      );
      if (response) {
        setTestimonials(response.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getTestimonials();
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
    { field: "author", headerName: "Author", width: 200 },
    { field: "content", headerName: "Content", width: 350 },
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
      <div className={style.testimonialsContainer}>
        <div className={style.testimonialsTable}>
          <DataGrid
            rows={testimonials}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
          />
        </div>
      </div>
    )
  );
}

export default TestimonialsDashboard;
