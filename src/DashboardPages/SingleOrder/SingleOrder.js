import style from "./SingleOrder.module.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function SingleOrder() {
  const [order, setOrder] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const id = useLocation().state;
  const [isOpen, setIsOpen] = useState(true);
  const [currentStatus, setCurrentStatus] = useState();
  async function getOrder() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}order/one/${id}`
      );
      if (response) {
        setOrder(response.data.data);
        setProducts(response.data.data.products);
        setLoading(false);
        console.log(response.data.data.products);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getOrder();
  }, []);
  const columns = [
    // {
    //   field: "name",
    //   headerName: "Name",
    //   width: 250,
    //   valueGetter: (params) =>
    //     `${params.row.userId[0].firstName} ${params.row.userId[0].lastName}`,
    // },
    // { field: "shippingAddress", headerName: "Address", width: 250 },
    {
      field: "name",
      headerName: "Product Name",
      width: 250,
      renderCell: (params) =>
        // <div className={`${style[params.row.status]} ${style.status}`}>
        //   {params.row.status}
        // </div>
        params.row.product.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      valueGetter: (params) => params.row.quantity,
    },
    {
      field: "size",
      headerName: "Size",
      width: 250,
      valueGetter: (params) =>
        `${params.row.size.capacity}${params.row.size.unit}`,
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
      valueGetter: (params) => params.row.size.price,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 250,
      valueGetter: (params) => params.row.quantity * params.row.size.price,
    },
  ];
  function getTotal() {
    let total = 0;
    products.map((item) => (total += item.size.price * item.quantity));
    return order.deliveryFee ? total + order.deliveryFee : total;
  }
  function getDate() {
    let result = order.orderDate.split(":")[0];
    result = result.substring(0, result.length - 3);
    return result;
  }
  return (
    !loading && (
      <div className={style.ordersContainer}>
        <div className={style.orderDetailsContainer}>
          <div className={style.invoice}>
            <span>Invoice: </span>
            <span>{order._id}</span>
          </div>
          <div className={style.clientOrder}>
            <span>Order From:</span>
            <span>
              {order.userId[0].firstName} {order.userId[0].lastName}
            </span>
            <span>
              {order.city}, {order.shippingAddress}
            </span>
          </div>
          <div className={style.orderDate}>
            {" "}
            <span>Order Date: </span>
            <span>{getDate()} </span>
          </div>
        </div>
        <div className={style.ordersTable}>
          <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
          />
          <span className={style.totalPrice}>Total: {getTotal()}</span>
        </div>
        <div className={style.changeStatusContainer}>
          <div
            className={style.openChangerBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            {" "}
            <IoIosArrowBack
              className={`${style.arrowLeft} ${isOpen && style.arrowRight}`}
            />
            {order.status}
          </div>
          <div
            className={`${style.optionsContainer} ${
              isOpen && style.optionsOpen
            }`}
          >
            <span className={style.status}>On Way</span>
            <span className={style.status}>Deliverd</span>
            <span className={style.status}>Cancelled</span>
            <span className={style.status}>Pending</span>
          </div>
        </div>
      </div>
    )
  );
}

export default SingleOrder;
