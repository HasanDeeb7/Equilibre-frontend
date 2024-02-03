import { NavLink } from "react-router-dom";
import Input from "../Input/Input";
import style from "./FirstSignup.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";
function FirstSignup({ newUser, setNewUser, setCurrentStep }) {
  const [confirmPassword, setConfirmPassword] = useState({ confirmPass: "" });
  const [existingData, setExistingData] = useState([]);
  const [error, setError] = useState();
  async function getExistingData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}user/`
      );
      if (response) {
        console.log(response);
        setExistingData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getExistingData();
  }, []);
  function handleSubmit() {
    if (
      [
        newUser.firstName,
        newUser.lastName,
        newUser.username,
        newUser.password,
        newUser.email,
      ].some((item) => !item || item === "")
    ) {
      return toast.error("All Fields are required");
    }
    if (existingData.some((item) => item.username === newUser.username)) {
      console.log("first");
      return toast.error("Username is taken!");
    }
    if (
      !newUser.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      return toast.error("Please enter a valid email");
    }
    if (newUser.password !== confirmPassword.confirmPass) {
      return toast.error("Passwords does not match");
    }
    if (!newUser.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      return toast.error(
        "Password should start with letter and has 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );
    }
    console.log("first");
    setCurrentStep(2);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={[0, 1.5, 2.2, 0, 1]}
      className={style.inputsContainer}
    >
      <Input
        value={newUser}
        setValue={setNewUser}
        label="First Name"
        control="firstName"
        required
      />
      <Input
        value={newUser}
        setValue={setNewUser}
        label="Last Name"
        control="lastName"
        required
      />
      <Input
        value={newUser}
        setValue={setNewUser}
        label="Username"
        control="username"
        required
        isError={error === "username"}
      />
      <Input
        value={newUser}
        setValue={setNewUser}
        label="Email"
        control="email"
        required
      />
      <Input
        value={newUser}
        setValue={setNewUser}
        label="Password"
        control="password"
        type="password"
        required
      />
      <Input
        value={confirmPassword}
        setValue={setConfirmPassword}
        label="Confirm Password"
        control="confirmPass"
        type="password"
        required
      />
      <button className={style.confirmButton} onClick={handleSubmit}>
        Continue
      </button>
      <span>
        Already have an account?{" "}
        <NavLink className={style.navLink} to="/login">
          Sign in
        </NavLink>
      </span>
    </motion.section>
  );
}

export default FirstSignup;
