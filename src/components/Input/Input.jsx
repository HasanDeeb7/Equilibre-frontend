import style from "./Input.module.css";

function Input({
  value,
  setValue,
  label,
  control,
  isDisabled = false,
  type = "text",
  tag = "input",
}) {
  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return (
    <div className={style.inputWrapper}>
      {tag === "input" ? (
        <>
          <form className={style.inputForm} autoComplete="off">
            <input
              className={style.loginInput}
              type={type}
              name={control}
              id={control}
              value={value[control]}
              onChange={handleChange}
              disabled={isDisabled}
            />
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
