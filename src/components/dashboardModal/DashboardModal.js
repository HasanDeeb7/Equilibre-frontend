import Input from "../Input/Input";
import style from "./DashboardModal.module.css";

function DashboardModal({ closeHandler, children, onConfirm }) {
  return (
    <div className={style.modalContainer}>
      <div className={style.modal}>
        {children}
        <div className={style.btnsContainer}>
          <button onClick={() => closeHandler()} className={style.cancelBtn}>
            Cancel
          </button>
          <button className={style.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardModal;
