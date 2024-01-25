import React from "react";
import style from "./ActionModal.module.css";
import { motion } from "framer-motion";

function ActionModal({ closeHandler, id, handleDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className={style.actionModalContainer}
    >
      <div className={style.contentContainer}>
        <p>Are you sure you wanna do this?</p>
        <div className={style.btnsContainer}>
          <button className={style.cancelBtn} onClick={closeHandler}>
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(id);
              closeHandler();
            }}
            className={style.confirmBtn}
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ActionModal;