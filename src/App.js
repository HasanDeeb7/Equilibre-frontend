import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import axios from "axios";
import { useUserStore } from "./Store";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import EditeUserProfile from "./components/UeserProfile/UserProfile";

function App() {
  axios.defaults.withCredentials = true;
  const { user, setUser, removeUser } = useUserStore();
  async function getUser() {
    try {
      if (!user) {
        const response = await axios.post(
          `${process.env.REACT_APP_ENDPOINT}user/login`
        );
        if (response) {
          console.log(response.data);
          setUser(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      {/* <EditeUserProfile/> */}
      
        <AppRoutes />
        {/* <Sidebar/> */}
        <Footer/>
    </div>
  );
}

export default App;
