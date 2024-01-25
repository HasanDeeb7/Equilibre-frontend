import { useEffect, useRef, useState } from "react";
import style from "./Select.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Select({ length, value, setValue }) {
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useState(false);
  function getItems() {
    const list = [];
    for (let i = 1; i <= length; i++) {
      list.push(
        <span
          key={i}
          className={style.option}
          onClick={() => setValue({ ...value, quantity: i })}
        >
          {i}
        </span>
      );
    }
    return list;
  }

  useEffect(()=> {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e) => {
    if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
        setIsOpen(false)
    }
  }

  return (
    <section
      className={style.selectContainer}
      onClick={() => setIsOpen(!isOpen)}
      ref={dropDownRef}
    >
      {value.quantity}
      <MdOutlineKeyboardArrowDown />
      {isOpen && (
        <section className={style.optionsContainer}>{getItems()}</section>
      )}
    </section>
  );
}

export default Select;
