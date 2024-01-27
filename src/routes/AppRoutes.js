import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Cart from "../pages/Cart/Cart";
import AboutUs from "../pages/AboutUs/AboutUs";
import Checkout from "../pages/Checkout/Checkout";
import ProtectedRoute from "./ProtectedRoute";
import { useUserStore } from "../Store";
import NavBar from "../Layout/NavBar/NavBar";
import ConsultingSection from "../components/ConsultingSection/ConsultingSection";
import NotFound from "../pages/NotFound/NotFound";
import UserProfile from "../pages/UserProfile/UserProfile";
import Sidebar from "../components/Sidebar/Sidebar";
import { AnimatePresence } from "framer-motion";
import ShippingPage from "../pages/shipping/ShippingPage";
import EditeUserProfile from "../components/UeserProfile/UserProfile";
import WithFooter from "../Layout/withFooter/WithFooter";
import WithoutFooter from "../Layout/WithoutFooter/WithoutFooter";
import ConfirmedPage from "../pages/confirmedPage/ConfirmedPage";
import OverView from "../DashboardPages/OverViewDash/OverView";
import Users from "../DashboardPages/Users/Users";
import ProductsDashboard from "../DashboardPages/ProductsDashboard/ProductsDashboard";
import Orders from "../DashboardPages/Orders/Orders";
import SingleOrder from "../DashboardPages/SingleOrder/SingleOrder";
import HeroSection from '../components/HeroSection/HeroSection'
function AppRoutes() {
  const { user } = useUserStore();
  const location = useLocation();
  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route element={<WithFooter />}>
          <Route path="/" element={<HeroSection key="home" />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route
            path="/consultation"
            element={<Products key="products" />}
          ></Route>
          <Route path="/single/:slug" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/shipping" element={<ShippingPage />}></Route>
        </Route>
        <Route element={<WithoutFooter />}>
          <Route path="/profile" element={<EditeUserProfile />}></Route>
          <Route path="/confirmed" element={<ConfirmedPage />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/dashboard/">
          <Route
            path="overview"
            element={
              // <ProtectedRoute isAllowed={user}>
              <OverView />
              // </ProtectedRoute>
            }
          />
          <Route path="users" element={<Users />}></Route>
          <Route path="products" element={<ProductsDashboard />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="orders/singleOrder" element={<SingleOrder />}></Route>
          {/* <Route path="" element={<Overview />}></Route> */}
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
