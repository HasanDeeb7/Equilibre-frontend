import style from "./SingleOrder.module.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { RxCheck } from "react-icons/rx";

function SingleOrder() {
  const [order, setOrder] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const id = useLocation().state;
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState();
  const [currentStatus, setCurrentStatus] = useState();
  function changeStatus(newStatus) {
    setCurrentStatus(newStatus);
    setIsOpen(false);
  }
  async function updateOrder() {
    console.log("first");
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_ENDPOINT}order/update`,
        { id: id, products: products, status: currentStatus }
      );
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function isDisabled() {
    console.log(order);
    if (order.status !== "cancelled" || order.status !== "delivered") {
      return false;
    } else {
      return true;
    }
  }
  async function getOrder() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}order/one/${id}`
      );
      if (response) {
        setOrder(response.data.data);
        setProducts(response.data.data.products);
        setLoading(false);
        setCurrentStatus(response.data.data.status);
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
    {
      field: "name",
      headerName: "Product Name",
      width: 250,
      renderCell: (params) => params.row.product.name,
    },
    {
      field: "size",
      headerName: "Size",
      width: 250,
      valueGetter: (params) =>
        `${params.row.size.capacity}${params.row.size.unit}`,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 250,
      valueGetter: (params) => params.row.quantity,
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
      width: 150,
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
        <div className={style.btnsContainer}>
          <div className={style.changeStatusContainer}>
            <div
              className={`${style.openChangerBtn} ${style[currentStatus]} ${
                isDisabled && order.status === "cancelled"
                  ? style.cancelledBtn
                  : isDisabled && order.status === "delivered"
                  ? style.deliveredBtn
                  : ""
              }`}
              onClick={() => !isDisabled && setIsOpen(!isOpen)}
            >
              {!isDisabled ? (
                <IoIosArrowBack
                  className={`${style.arrowLeft} ${isOpen && style.arrowRight}`}
                />
              ) : isDisabled && order.status === "cancelled" ? (
                <RxCross2 className={style.arrowLeft} />
              ) : (
                <RxCheck className={style.arrowLeft} />
              )}
              {currentStatus}
            </div>
            <div
              className={`${style.optionsContainer} ${
                isOpen && style.optionsOpen
              }`}
            >
              <span
                onClick={() => changeStatus("onWay")}
                className={`${style.status} ${style.onWay}`}
              >
                On Way
              </span>
              <span
                onClick={() => changeStatus("delivered")}
                className={`${style.status} ${style.delivered}`}
              >
                Delivered
              </span>
              <span
                onClick={() => changeStatus("cancelled")}
                className={`${style.status} ${style.cancelled}`}
              >
                Cancelled
              </span>
              <span
                onClick={() => changeStatus("pending")}
                className={`${style.status} ${style.pending}`}
              >
                Pending
              </span>
            </div>
          </div>
          {!isDisabled && (
            <button onClick={updateOrder} className={style.updateBtn}>
              Update
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default SingleOrder;
