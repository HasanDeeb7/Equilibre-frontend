import style from "./DashboardModal.module.css";
import { motion } from "framer-motion";

function DashboardModal({ closeHandler, children, onConfirm, title }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn" }}
      className={style.modalContainer}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", delay: 0.3 }}
        className={style.modal}
      >
        <h2 className={style.modalTitle}>{title}</h2>
        {children}
        <div className={style.btnsContainer}>
          <button onClick={() => closeHandler()} className={style.cancelBtn}>
            Cancel
          </button>
          <button className={style.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DashboardModal;
