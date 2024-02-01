import { useState } from "react";
import style from "./Input.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({
  value,
  setValue,
  label,
  control,
  isDisabled = false,
  type = "text",
  tag = "input",
  required = false,
}) {
 
  const [isShown, setIsShown] = useState(false);
  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  function togglePassword() {
    if (type === "password") {
      setIsShown(!isShown);
      type = "text";
    }
  }

  return (
    <div className={style.inputWrapper}>
      {tag === "input" ? (
        <>
          <form className={style.inputForm} autoComplete="off">
            <input
              className={`${style.loginInput}`}
              type={isShown ? "text" : type}
              name={control}
              id={control}
              value={value[control]}
              onChange={handleChange}
              disabled={isDisabled}
                
            />
            {required && <div className={style.requiredInput}></div>}
            {type === "password" &&
              (isShown ? (
                <FaRegEyeSlash
                  className={style.eyeIcon}
                  onClick={togglePassword}
                />
              ) : (
                <FaRegEye className={style.eyeIcon} onClick={togglePassword} />
              ))}
            <label
              className={`${style.loginInputLable} ${
                value[control] && style.inputActive
              }`}
            >
              {label}
            </label>
          </form>
        </>
      ) : (
        <>
          <textarea
            className={style.textarea}
            type={type}
            name={control}
            id={control}
            value={value[control]}
            onChange={handleChange}
            disabled={isDisabled}
            style={{ resize: "none", width: "300px", height: "100px" }}
          />
          <label
            className={`${style.textareaLabel} ${
              value[control] && style.textareActive
            }`}
          >
            {label}
          </label>
        </>
      )}
    </div>
  );
}

export default Input;
