import { useContext, useState } from "react";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../Store";

function Login() {
  const { user, setUser } = useUserStore();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  async function handleLogin() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}user/login`,
        credentials
      );
      if (response.status) {
        setUser(response.data);
        toast.success(`Welcome Back ${response.data.firstName}`);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        console.log(error);
        toast.error("Server Error");
        return;
      }
      toast.error(error.response.data.error);
    }
  }
  return (
    <div className={style.loginPageContainer}>
      <div className={style.loginFormContainer}>
        <Input
          value={credentials}
          setValue={setCredentials}
          label="Username"
          control="username"
        />
        <Input
          value={credentials}
          setValue={setCredentials}
          label="Password"
          control="password"
        />
        <button className={style.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
