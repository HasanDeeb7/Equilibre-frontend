import { useEffect, useState } from "react";
import style from "./Users.module.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    getUsers();
  }, []);
  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
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
      <div className={style.usersContainer}>
        <div className={style.usersTable}>
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
          />
        </div>
      </div>
    )
  );
}

export default Users;
