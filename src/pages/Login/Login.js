import { useContext, useState } from "react";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import axios from "axios";
import { UserContext } from "../../App";
import { toast } from "react-toastify";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  async function handleLogin() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}user/login`,
        credentials
      );
      if (response.status) {
        setUser(response.data);
        toast.success(`Welcome Back ${response.data .firstName}`);
      }
    } catch (error) {
      console.log(error);
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
