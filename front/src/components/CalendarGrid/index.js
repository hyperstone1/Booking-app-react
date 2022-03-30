import React from "react";
import styled from "styled-components";
import moment from "moment";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? "#1e1f21" : "#4d4c4d")};
  ${(props) => props.isHeader && "border-bottom: 1px solid #4d4c4d"}
`;

const RowInCell = styled.div`
  display: flex;
  min-width: 148px;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`};

  @media (max-width: 1106px) {
    min-width: 120px;
    min-height: 16px;
  }
  @media (max-width: 979px) {
    min-width: 50px;
  }

  @media (max-width: 545px) {
    min-width: 40px;
    ${(props) => props.pr && `padding-right: ${props.pr * 0}px`};
    ${(props) => props.pr && `padding-right: ${props.pr * 0}px`};
    justify-content: ${(props) => (props.isHeader ? "" : "center")};
  }
`;
const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CellWrapper = styled.div`
  min-height: ${(props) => (props.isHeader ? 24 : 88)}px;
  @media (max-width: 1102px) {
    min-height: 70px;
    min-height: ${(props) => (props.isHeader ? 24 : 88)}px;
  }
  color: ${(props) => (props.isSelectedMonth ? "#dddddd" : "#555759")};
  background-color: ${(props) => (props.isWeekend ? "#272829 " : "#1e1f21")};
  background-color: ${(props) => (props.isBookingDays ? "#323634" : "")};
  background-color: ${(props) => (props.isArray ? "#476355" : "")};
  border: ${(props) => (props.isArray ? "2px solid #86baa0;" : "")};
  @media (max-width: 979px) {
    min-width: 50px;
    font-size: 12px;
    min-height: ${(props) => (props.isHeader ? 24 : 70)}px;
  }
  @media (max-width: 545px) {
    font-size: ${(props) => (props.isHeader ? 7 : 10)}px;
    min-height: ${(props) => (props.isHeader ? 8 : "")}px;
  }
  :hover {
    background-color: #484f4a;
    cursor: pointer;
  }
  :active {
    background-color: rgb(141, 116, 116);
  }
`;
const NameInCell = styled.div`
  font-size: 16px;
`;

let selectedDays = [];

const CalendarGrid = ({ startDay, today, name }) => {
  const totalDays = 42;
  const week = 7;
  let price = null;
  const priceWeekDay = 10;
  const priceDayOff = 30;
  let daysGone = [];
  let receivedName = "";
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isSelectedMonth = (day) => today.isSame(day, "month");
  const isCurrentMonth = (day) => moment().isSame(day, "month");
  const isArray = (i) => selectedDays.some((elem) => i == elem.id);
  const isName = (i) => name.som((elem) => i == elem.id);

  const isBookingDays = (dayItem, i) =>
    !daysGone.some((elem) => i == elem.index) &&
    isCurrentMonth(dayItem) &&
    isSelectedMonth(dayItem);

  const daysArraySlice = () => {
    daysArray.filter((dayItem, i) => {
      if (isCurrentDay(dayItem)) {
        daysGone = daysArray.slice(0, i);
        return daysGone;
      }
    });
  };
  daysArraySlice();

  const isSelected = (dayItem, i) => {
    if (selectedDays.some((elem) => i == elem.id)) {
      let arrInd = selectedDays.findIndex((elem) => i == elem.id);
      selectedDays.splice(arrInd, 1);
    } else if (isBookingDays(dayItem, i)) {
      selectedDays.push({
        id: dayItem.index,
        date: dayItem._d,
        price: dayItem.price,
      });
    }
  };

  const priceWeek = () => {
    daysArray.map((dayItem, i) => {
      if (dayItem.day() === 6 || dayItem.day() === 0) {
        dayItem.price = priceDayOff;
      } else {
        dayItem.price = priceWeekDay;
      }
    });

    return price;
  };
  priceWeek(price);

  const indexFindName1 = () => {
    for (let i in name) {
      for (let key in name[i]) {
        if (key === "title") {
          receivedName = name[i][key];
        }
      }
    }
  };
  indexFindName1();

  return (
    <>
      <GridWrapper isHeader>
        {[...Array(week)].map((_, i) => (
          <CellWrapper isHeader isSelectedMonth>
            <RowInCell justifyContent={"flex-end"} pr={1}>
              {moment()
                .day(i + 1)
                .format("dddd")}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysArray.map(
          (dayItem, i) => (
            (dayItem.index = i),
            (
              <CellWrapper
                isBookingDays={isBookingDays(dayItem, i)}
                isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                key={dayItem.unix()}
                isSelectedMonth={isSelectedMonth(dayItem)}
                onClick={() => isSelected(dayItem, i)}
                isArray={isArray(i)}
              >
                <RowInCell justifyContent={"flex-end"}>
                  <DayWrapper>
                    {!isCurrentDay(dayItem) && dayItem.format("D")}
                    {isCurrentDay(dayItem) && (
                      <CurrentDay>{dayItem.format("D")}</CurrentDay>
                    )}
                  </DayWrapper>
                </RowInCell>

                <div>
                  {isBookingDays(dayItem, i) && isArray(i) && isName ? (
                    <NameInCell> {receivedName}</NameInCell>
                  ) : null}
                  {isBookingDays(dayItem, i) && isArray(i) ? (
                    <div> Цена: {dayItem.price}р</div>
                  ) : null}
                </div>
              </CellWrapper>
            )
          )
        )}
      </GridWrapper>
    </>
  );
};

export { selectedDays };
export { CalendarGrid };
