import { useContext, useState } from "react";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../Store";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  async function handleLogin() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}user/login`,
        { ...credentials, email: credentials.username }
      );
      if (response.status) {
        setUser(response.data);
        toast.success(`Welcome Back ${response.data.firstName}`);
        return navigate("/", { replace: true });
      }
    } catch (error) {
      if (error.message === "Network Error") {
        console.log(error);
        toast.error("Server Error");
        setLoading(false);
      }
      toast.error(error.response.data.error);
      setLoading(false);
    }
  }
  return (
    <section className={style.loginPageContainer}>
      <section className={style.loginFormContainer}>
        <h1 className={style.header}>Sign In</h1>
        <section className={style.inputsContainer}>
          <Input
            value={credentials}
            setValue={setCredentials}
            label="Email or Username"
            control="username"
            isDisabled={loading}
            required
          />
          <Input
            value={credentials}
            setValue={setCredentials}
            label="Password"
            control="password"
            type="password"
            required
          />
          <button className={style.loginButton} onClick={handleLogin}>
            Login
          </button>
          <span>
            You don't have an account?{" "}
            <NavLink className={style.navLink} to="/signup">
              SignUp
            </NavLink>
          </span>
        </section>
      </section>
    </section>
  );
}

export default Login;
