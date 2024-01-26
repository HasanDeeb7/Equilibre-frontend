import style from "./Orders.module.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getorders() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}order/getallorders`
      );
      if (response) {
        setOrders(response.data);
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getorders();
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      valueGetter: (params) =>
        `${params.row.userId[0].firstName} ${params.row.userId[0].lastName}`,
    },
    { field: "shippingAddress", headerName: "Address", width: 250 },
    {
      field: "orderDate",
      headerName: "Date",
      width: 250,
      valueGetter: (params) => {
        const result = params.row.orderDate.split(":")[0];
        return result.substring(0, result.length - 3);
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => (
        <div className={`${style[params.row.status]} ${style.status}`}>
          {params.row.status}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <button
          className={style.viewMoreBtn}
          onClick={() => navigate("singleOrder", { state: params.row._id })}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    !loading && (
      <div className={style.ordersContainer}>
        <div className={style.ordersTable}>
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            rowSelection={false}
          />
        </div>
      </div>
    )
  );
}

export default Orders;
