import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Cart from "../pages/Cart/Cart";
import AboutUs from "../pages/AboutUs/AboutUs";
import Checkout from "../pages/Checkout/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useContext, useEffect } from "react";
import { useUserStore } from "../Store";
import NavBar from "../Layout/NavBar/NavBar";
import ShippingPage from "../pages/shipping/ShippingPage";
import ConsultingSection from '../components/ConsultingSection/ConsultingSection'
function AppRoutes() {
  const { user } = useUserStore();

  return (
    <div>
      <Routes>
        <Route  element={<NavBar />}>
          <Route path="/" element={<ConsultingSection />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/consultation" element={<Products />}></Route>
          <Route path="/profile" element={<Products />}></Route>
          <Route path="/single" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/shipping" element={<ShippingPage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAllowed={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
