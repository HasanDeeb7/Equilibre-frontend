import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "./Store";

export const UserContext = createContext();

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
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
