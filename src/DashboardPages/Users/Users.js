import { useEffect, useState } from "react";
import style from "./Users.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ActionModal from "../../components/ActionModal/ActionModal";
import { toast } from "react-toastify";
import DashboardModal from "../../components/dashboardModal/DashboardModal";
import UserForm from "../../components/Userform/UserForm";

function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ pageSize: 20, page: 0 });
  const [modal, setModal] = useState();
  const [target, setTarget] = useState();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    isAdmin: false,
  });
  async function getUsers() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}user/`
      );
      if (response) {
        setUsers(response.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function deleteUser(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT}user/delete`,
        { params: { id: target } }
      );
      if (response) {
        console.log(response.data);
        setModal("success");
        getUsers();
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error("Error deleting the user");
      setLoading(false);
    }
  }

  async function addUser() {
    console.log(newUser);
    if (Object.values(newUser).some((item) => item === "" || !item)) {
      return toast.error("All fields are required");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}user/signup`,
        newUser
      );
      if (response) {
        setUsers(response.data);
        setLoading(false);
        getUsers();
        console.log(response.data);
        setModal("success");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  const columns = [
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div className={style.btnsContainer}>
          {/* <button
            className={style.editBtn}
            // onClick={() => handleButtonClick(params.row)}
          >
            Edit
          </button> */}
          <button
            className={style.deleteBtn}
            onClick={() => {
              setModal("action");
              setTarget(params.row._id);
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
        {modal === "form" && (
          <DashboardModal
            title={"New User"}
            closeHandler={() => setModal(null)}
            onConfirm={() => addUser()}
          >
            {" "}
            <UserForm user={newUser} setUser={setNewUser} />
          </DashboardModal>
        )}
        {modal === "success" ? (
          <SuccessModal
            message={target ? "User deleted" : "User Added"}
            closeHandler={() => setModal(null)}
          />
        ) : modal === "action" ? (
          <ActionModal
            message="Are you sure you want to delete this user"
            closeHandler={() => setModal(null)}
            action={() => deleteUser()}
          />
        ) : (
          ""
        )}

        <div className={style.usersContainer}>
          <h1>Users</h1>
          <div className={style.usersTable}>
            <button
              className={style.addBtn}
              onClick={() => {
                setModal("form");
                setTarget(null);
              }}
            >
              Add an admin
            </button>
            <DataGrid
              rows={users}
              columns={columns}
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

export default Users;
