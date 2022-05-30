import { Box, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DateJour from "../../components/DateJour";

export default function DashboardApp() {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(null);
  const [calendarPicker, setCalendarPicker] = useState(false);
  function funcSetDate(date) {
    setDate(date);
    alert(date)
  }
  return (
    <Container>
      <div className="col-md-12">
      <div className="date-jour" style={{position:"fixed", top:"30%",zIndex:2000}} >
      <Calendar
        onChange={(e) => {
          console.log(e)
          setValue(e);
        }}
        value={value}
      />
    </div>
      </div>
    </Container>
  );
}
