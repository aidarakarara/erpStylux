import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DateJour({ show, funcSetDate, value_date }) {
  const [value, setValue] = useState(new Date());

  const options = { day: "numeric", month: "long", year: "numeric" };

  const wrapperRef = useRef(null);

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      show(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setValue(value_date);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="date-jour" style={{position:"fixed", top:"30%",zIndex:2000}} ref={wrapperRef}>
      <Calendar
        onChange={(e) => {
          setValue(e);
          funcSetDate(e);
          show(false);
          console.log(e);
        }}
        value={value}
      />
    </div>
  );
}
