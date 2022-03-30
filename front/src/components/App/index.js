import React, { useState } from "react";
import moment from "moment";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { CalendarGrid } from "../CalendarGrid/index";
import styled from "styled-components";

const CalendarWrapper = styled.div`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-right: 1px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 1px #1a1a1a, 0 2px 10px 1px #000;
`;

function App() {
  let index = 0;
  moment.updateLocale("en", { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");
  const endDay = today.clone().endOf("month");
  const [name, setName] = useState([{ title: "", id: index }]);
  const handleSubmit = (title, id) => {
    setName([...name, { title, id }]);
  };

  const prevHandler = () => {
    console.log("prev");
    setToday((prev) => prev.clone().subtract(1, "month"));
  };
  const todayHandler = () => {
    console.log("today");
    setToday(moment());
  };
  const nextHandler = () => {
    console.log("next");
    setToday((next) => next.clone().add(1, "month"));
  };

  return (
    <CalendarWrapper>
      <Header submitName={handleSubmit} />
      <Monitor
        today={today}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <CalendarGrid
        startDay={startDay}
        today={today}
        endDay={endDay}
        name={name}
      />
    </CalendarWrapper>
  );
}

export default App;
