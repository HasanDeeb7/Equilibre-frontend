import style from "./SuccessModal.module.css";
import { easeIn, motion } from "framer-motion";
import { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";

function SuccessModal({ message, closeHandler }) {
  useEffect(() => {
    setTimeout(() => {
      closeHandler();
    }, 1500);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn" }}
      className={style.modalContainer}
    >
      <div className={style.modal}>
        <h3>{message}</h3>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ease: easeIn, delay: 0.3 }}
        >
          <CiCircleCheck className={style.checkMark} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SuccessModal;
