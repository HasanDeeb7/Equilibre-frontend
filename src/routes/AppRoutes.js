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
import NotFound from "../pages/NotFound/NotFound";
import UserProfile from "../pages/UserProfile/UserProfile";
import { AnimatePresence } from "framer-motion";
import ShippingPage from "../pages/shipping/ShippingPage";
import EditeUserProfile from "../components/UeserProfile/UserProfile";
import WithFooter from "../Layout/withFooter/WithFooter";
import WithoutFooter from "../Layout/WithoutFooter/WithoutFooter";
import ConfirmedPage from "../pages/confirmedPage/ConfirmedPage";
import OverView from "../DashboardPages/OverViewDash/OverView";
import Users from "../DashboardPages/Users/Users";
import ConsultingPage from "../pages/ConsultingPage/ConsultingPage";
import ProductsDashboard from "../DashboardPages/ProductsDashboard/ProductsDashboard";
import Orders from "../DashboardPages/Orders/Orders";
import SingleOrder from "../DashboardPages/SingleOrder/SingleOrder";
import ContactUsPage from "../pages/ContactUsPage/ContactUsPage";
import SideBar from "../Layout/SideBar/SideBar";
import TestimonialsDashboard from "../DashboardPages/Testimonials/TestimonialsDashboard";
import Offers from "../DashboardPages/Offers/Offers";
import { HelmetProvider } from "react-helmet-async";
import Categories from "../DashboardPages/Categories/Categories";
import Consultation from "../DashboardPages/Consultation/Consultation";
import EmtyCart from "../components/EmptyCart/EmptyCart";
import Unauthorised from "../pages/Unauthorised/Unauthorised";
function AppRoutes() {
  const { user } = useUserStore();
  const location = useLocation();
  return (
    <div>
      <HelmetProvider>
        <Routes location={location} key={location.pathname}>
          <Route element={<WithFooter />}>
            <Route path="/" element={<Home key="home" />}></Route>
            <Route path="/consultation" element={<ConsultingPage />}></Route>
            <Route
              path="/products"
              element={<Products key="products" />}
            ></Route>
            <Route path="/single/:slug" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route
              path="/shipping"
              element={
                <ProtectedRoute isAllowed={user} redirectPath="/login">
                  <ShippingPage />{" "}
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/contact" element={<ContactUsPage />}></Route>
          </Route>
          <Route element={<WithoutFooter />}>
            <Route path="/profile" element={<EditeUserProfile />}></Route>
            <Route path="/confirmed" element={<ConfirmedPage />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAllowed={user} redirectPath="/login">
                <Checkout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/profile" element={<UserProfile />}></Route>

          <Route
            element={
              <ProtectedRoute
                isAllowed={user && user.isAdmin}
                redirectPath="/unauthorised"
              />
            }
          >
            <Route path="/dashboard/" element={<SideBar />}>
              <Route path="overview" element={<OverView />} />
              <Route path="users" element={<Users />}></Route>
              <Route path="products" element={<ProductsDashboard />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="offers" element={<Offers />}></Route>
              <Route path="consultation" element={<Consultation />}></Route>
              <Route
                path="testimonials"
                element={<TestimonialsDashboard />}
              ></Route>
              <Route
                path="orders/singleOrder"
                element={<SingleOrder />}
              ></Route>
              {/* <Route path="" element={<Overview />}></Route> */}
              <Route path="categories" element={<Categories />}></Route>
            </Route>
          </Route>
          <Route path="/unauthorised" element={<Unauthorised />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </HelmetProvider>
    </div>
  );
}

export default AppRoutes;
