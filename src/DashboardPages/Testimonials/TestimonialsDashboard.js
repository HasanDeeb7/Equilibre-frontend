import { useEffect, useState } from "react";
import style from "./TestimonialsDashboard.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DashboardModal from "../../components/dashboardModal/DashboardModal";
import TestimonialForm from "../../components/TestimonialForm/TestimonialForm";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ActionModal from "../../components/ActionModal/ActionModal";
import { toast } from "react-toastify";
function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState();
  const [target, setTarget] = useState(null);
  const [pagination, setPagination] = useState({ pageSize: 20, page: 0 });
  const [newTestimonial, setNewTestimonial] = useState({
    author: "",
    content: "",
    image: null,
  });
  async function update() {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}testimonial/update`,
        { ...target, id: target._id }
      );
      if (response) {
        console.log(response);
        setMessage("Testimonial Updated");
        setModal("success");
        getTestimonials();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error updating data");
    }
  }
  async function deleteTestimonial() {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}testimonial/delete/`,
        { params: { id: target._id } }
      );
      if (response) {
        console.log(response.data);
        setMessage("Testimonial deleted ");
        setModal("success");
        getTestimonials();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function addTestimonial() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}testimonial/create/`,
        { ...newTestimonial },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
        console.log(response.data);
        setMessage("Added Testimonial");
        setModal("success");
        getTestimonials();
        setNewTestimonial({ author: "", content: "", image: null });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      console.log(newTestimonial);
    }
  }

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
    { field: "content", headerName: "Content", width: 400 },
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
            title="Testimonial"
            closeHandler={() => setModal(null)}
            onConfirm={() => {
              if (target) {
                update();
              } else {
                addTestimonial();
              }
            }}
          >
            <TestimonialForm
              testimonial={target ? target : newTestimonial}
              setTestimonial={target ? setTarget : setNewTestimonial}
            />
          </DashboardModal>
        ) : modal === "success" ? (
          <SuccessModal closeHandler={() => setModal(null)} message={message} />
        ) : modal === "action" ? (
          <ActionModal
            message="Are you sure you want to delete this testimonial"
            closeHandler={() => setModal(null)}
            action={() => deleteTestimonial()}
          />
        ) : (
          ""
        )}
        <div className={style.testimonialsContainer}>
          <h1>Testimonials</h1>
          <div className={style.testimonialsTable}>
            <button
              className={style.addBtn}
              onClick={() => {
                setTarget(null);
                setModal("form");
              }}
            >
              Add Testimonial
            </button>
            <DataGrid
              rows={testimonials}
              columns={columns}
              rowCount={testimonials.length}
              getRowId={(row) => row._id}
              autoHeight
              paginationModel={pagination}
              pagination
              pageSizeOptions={[5, 20, 50, 100]}
              onPaginationModelChange={setPagination}
            />
          </div>
        </div>
      </>
    )
  );
}

export default TestimonialsDashboard;
