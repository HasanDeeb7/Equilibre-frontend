import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "./Store";

function App() {
  axios.defaults.withCredentials = true;
  const { user, setUser, removeUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  async function getUser() {
    try {
      if (!user) {
        const response = await axios.post(
          `${process.env.REACT_APP_ENDPOINT}user/login`
        );
        if (response) {
          console.log(response.data);
          setUser(response.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  console.clear()
  return (
    !loading && (
      <div className="App">
        <AppRoutes />
      </div>
    )
  );
}

export default App;
