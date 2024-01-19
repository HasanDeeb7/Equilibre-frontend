import style from "./SecondSignup.module.css";
import Input from "../Input/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SecondSignup({ newUser, setNewUser, setCurrentStep }) {
  const navigate = useNavigate();
  async function handleSignUp() {
    if (!newUser.gender) {
      return toast.error("Gender is required");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}user/signup`,
        newUser
      );
      if (response) {
        console.log(response.data);
        toast.success("Account Created Successfully, you can login now");
        return navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
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
        label="Age"
        control="age"
        required
      />
      <Input
        value={newUser}
        setValue={setNewUser}
        label="Phone"
        control="phone"
        required
      />
      <Input
        value={newUser}
        setValue={setNewUser}
        label="Your Location"
        control="location"
      />
      <section className={style.genderContainer}>
        <label htmlFor="gender">Gender</label>
        <section className={style.genderWrapper}>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="Male"
            checked={newUser.gender === "Male"}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="Female"
            checked={newUser.gender === "Female"}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
          />
        </section>
      </section>
      <button className={style.signUpButton} onClick={handleSignUp}>
        Create Account
      </button>
      <button className={style.signUpButton} onClick={() => setCurrentStep(1)}>
        Go Back
      </button>
    </motion.section>
  );
}

export default SecondSignup;
