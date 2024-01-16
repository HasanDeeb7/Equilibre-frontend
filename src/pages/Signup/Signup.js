import { useContext, useState } from "react";
import style from "./Signup.module.css";
import { useUserStore } from "../../Store";
import { NavLink } from "react-router-dom";
import FirstSignup from "../../components/FirstSignup/FirstSignup";
import SecondSignup from "../../components/SecondSignup/SecondSignup";
import { AnimatePresence } from "framer-motion";

function Signup() {
  const { user, setUser } = useUserStore();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    location: "",
    gender: "",
    age: null,
  });
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section className={style.loginPageContainer}>
      <section className={style.loginFormContainer}>
        <h1 className={style.header}>Create Account </h1>
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <FirstSignup
              newUser={newUser}
              setNewUser={setNewUser}
              setCurrentStep={setCurrentStep}
            />
          ) : (
            <SecondSignup
              newUser={newUser}
              setNewUser={setNewUser}
              setCurrentStep={setCurrentStep}
            />
          )}
        </AnimatePresence>
      </section>
    </section>
  );
}

export default Signup;
