import { Route, Routes, useLocation } from "react-router-dom";
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
import { useUserStore } from "../Store";
import NavBar from "../Layout/NavBar/NavBar";
import ConsultingSection from "../components/ConsultingSection/ConsultingSection";
import NotFound from "../pages/NotFound/NotFound";
import UserProfile from "../pages/UserProfile/UserProfile";
import Sidebar from "../components/Sidebar/Sidebar";
import EditeUserProfile from "../components/UeserProfile/UserProfile";
import Overview from "../DashboardPages/Overview/Overview";
import Users from "../DashboardPages/Users/Users";
function AppRoutes() {
  const { user } = useUserStore();
  const location = useLocation();
  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route element={<NavBar />}>
          <Route path="/" element={<ConsultingSection key="home" />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route
            path="/consultation"
            element={<Products key="products" />}
          ></Route>
          {/* <Route path="/profile" element={<Products />}></Route> */}
          <Route path="/single/:slug" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route
            path="overview"
            element={
              // <ProtectedRoute isAllowed={user}>
              <Overview />
              // </ProtectedRoute>
            }
          />
            {/* <Route path="/users" element={<Users />}></Route> */}
            {/* <Route path="" element={<Overview />}></Route> */}
          
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
