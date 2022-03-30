import styled from "styled-components";
import Modal from "../modal/Modal";
import React, { useState } from "react";
import "./header.css";
import { selectedDays } from "../CalendarGrid/index";
import { ENDPOINT_API, DEFAULT_PARAMS_FETCH } from "../constants/constants";

const HeaderCal = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  background: rgb(35, 39, 39);
  color: #fff;
  height: 50px;
`;

const HeaderButtons = styled.div`
  position: relative;
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 1102px) {
    width: 40%;
  }
  @media (max-width: 496px) {
    width: 70%;
  }
`;

const ButtonOpen = styled.button`
  margin-top: 10px;
  background-color: rgb(48, 65, 80);
  border: none;
  border-bottom-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 22px;
  color: rgb(174, 196, 228);
  :hover {
    background-color: #2e4a3c;
    color: #fff;
    cursor: pointer;
  }
  :active {
    -webkit-box-shadow: -1px 4px 7px 47px rgba(255, 0, 56, 0.74) inset;
    -moz-box-shadow: -1px 4px 7px 47px rgba(255, 0, 56, 0.74) inset;
    box-shadow: -1px 4px 7px 47px rgba(255, 0, 56, 0.74) inset;
  }
  @media (max-width: 1102px) {
    font-size: 18px;
  }
  @media (max-width: 979px) {
    font-size: 13px;
  }
  @media (max-width: 496px) {
    font-size: 13px;
  }
`;

const ButtonUnbooking = styled.button`
  background-color: rgb(48, 65, 80);
  margin-top: 10px;
  border: none;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 22px;
  color: rgb(174, 196, 228);
  :hover {
    background-color: rgb(67, 81, 87);
    cursor: pointer;
    color: #fff;
  }
  :active {
    -webkit-box-shadow: -1px 4px 7px 47px rgba(255, 0, 56, 0.74) inset;
    -moz-box-shadow: -1px 4px 7px 47px rgba(255, 0, 56, 0.74) inset;
    box-shadow: -1px 4px 7px 47px rgba(255, 0, 56, 0.74) inset;
  }
  @media (max-width: 1102px) {
    font-size: 18px;
  }
  @media (max-width: 979px) {
    font-size: 13px;
  }
  @media (max-width: 496px) {
    font-size: 13px;
  }
`;
const CloseButtonDiv = styled.div``;

const UpBlock = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonDown = styled.div`
  display: flex;
  position: relative;
  padding: 20px 0px 20px 0px;
  width: 90%;
  justify-content: space-between;
  @media (max-width: 1106px) {
      font-size: 12px;
    }
  }
  @media (max-width: 675px) {
      padding: 0px 0px 20px 0px;

  }

  @media (max-width: 510px) {
      padding: 0px 0px 20px 0px;

  }
  @media (max-width: 446px) {

    padding: 0px 0px 20px 0px;
      
    
  }
`;
const EnterName = styled.p`
  margin-bottom: 0px;
  @media (max-width: 1106px) {
    font-size: 14px;
    }
  }
  @media (max-width: 675px) {
    font-size: 14px;

      width: 35vw;
  }

  @media (max-width: 510px) {
    font-size: 12px;
      width: 45vw;

  }
  @media (max-width: 446px) {

      width: 53vw;

  }
`;
const TotalPrice = styled.p`
  margin-top: 0px;
  @media (max-width: 1106px) {
      font-size: 15px;
    }
  }
  @media (max-width: 675px) {
    font-size: 14px;
      width: 40vw;
  }

  @media (max-width: 510px) {

      width: 45vw;

  }
  @media (max-width: 446px) {

      width: 53vw;

  }
`;
const ChooseTime = styled.p`
  margin-top: 0px;
  margin-bottom: 7px;
  @media (max-width: 1106px) {
      font-size: 15px;
    }
  }
  @media (max-width: 675px) {
    font-size: 14px;
      width: 40vw;
  }

  @media (max-width: 510px) {
      width: 45vw;

  }
  @media (max-width: 446px) {
      width: 53vw;

  }
`;
const YouChoose = styled.p`
    @media (max-width: 1106px) {
      font-size: 15px;
    }
  }
  @media (max-width: 675px) {
      width: 40vw;
      font-size: 14px;
  }

  @media (max-width: 510px) {
      width: 45vw;
  }
  @media (max-width: 446px) {
      width: 53vw;
  }
  `;
const Header = ({ submitName }) => {
  const [modalActive, setModalActive] = useState(false);
  let arrPrice = 0;
  let getName = null;
  let nameArr = [];
  let nameFromInput = "";
  const totalPrice = () => {
    arrPrice = selectedDays
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr, 0);
  };

  const arrStr = () => {
    for (let i in selectedDays) {
      for (let key in selectedDays[i]) {
        if (key === "date") {
          getName = key + ":" + selectedDays[i][key] + ", ";
          nameArr.push(getName.substring(9, 15));
          nameFromInput = nameArr.join(", ");
        }
      }
    }
  };
  let idArr = [];
  const [id, setId] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    select: "10:00",
    date: ``,
    price: "",
  });
  const [title, setTitle] = useState([]);
  const handleSubmitName = (e) => {
    e.preventDefault();
    submitName(title, id);
  };
  const isSelected = () => {
    for (let i in selectedDays) {
      for (let key in selectedDays[i]) {
        if (key === "id") {
          idArr.push({ id: selectedDays[i][key] });
        }
      }
    }
  };
  isSelected();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setTitle(e.target.value);
    setId(idArr);
  };

  const handleClear = (e) => {
    e.preventDefault();
    handleSubmitName(e);

    setForm({ name: "", email: "", select: "", date: ``, price: "" });
    setModalActive(false);
  };
  const handleDeleteBooking = (e) => {
    e.preventDefault();
    handleSubmitName(e);
    setForm({ name: "", email: "", select: "", date: ``, price: "" });
    selectedDays.splice(0, selectedDays.length);
    setTitle(" ");
  };
  const handleClearForm = (e) => {
    setForm({
      ...form,
      ["name"]: "",
      ["email"]: ``,
    });
  };
  const setCurrentTime = () => {
    arrStr();
    totalPrice();
    setForm({ ...form, ["date"]: nameFromInput, ["price"]: `${arrPrice}р` });
    setModalActive(true);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    fetch(ENDPOINT_API, {
      ...DEFAULT_PARAMS_FETCH,
      body: JSON.stringify(form),
    });
    handleClear(e);
  };

  return (
    <HeaderCal>
      <HeaderButtons>
        <ButtonOpen onClick={() => setCurrentTime()}>Забронировать</ButtonOpen>
        <ButtonUnbooking onClick={(e) => handleDeleteBooking(e)}>
          Убрать бронь
        </ButtonUnbooking>
      </HeaderButtons>
      <Modal active={modalActive} setActive={setModalActive}>
        <form class="form__modal" onSubmit={handleSubmitForm} method="post">
          <UpBlock>
            <EnterName>Введите ФИО</EnterName>
            <input
              onChange={(e) => {
                handleSubmit(e);
              }}
              type="text"
              name={"name"}
              value={form.name}
            />
            <EnterName>Введите Email</EnterName>
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              type="email"
              name={"email"}
              value={form.email}
            />
          </UpBlock>
          <YouChoose>
            <b>Вы выбрали:</b> {form.date}
          </YouChoose>

          <TotalPrice>
            <b>Общая сумма:</b> {form.price}
          </TotalPrice>

          <ChooseTime>Выберите время бронирование</ChooseTime>
          <div>
            <select
              required
              onChange={(e) => {
                handleChange(e);
              }}
              name="select"
              value={form.select}
            >
              <option>10:00</option>
              <option>12:00</option>
              <option>14:00</option>
            </select>
          </div>
          <ButtonDown>
            <input type="submit" value="Отправить" />
            <input
              type="reset"
              value="Очистить"
              onClick={(e) => handleClearForm(e)}
            />
          </ButtonDown>
        </form>
      </Modal>
    </HeaderCal>
  );
};
export { Header };
