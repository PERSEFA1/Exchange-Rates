import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./style/ByDate.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const CurrencyByDate = () => {
  const [date, setDate] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrencies = async () => {
    if (!date) return;
    const formattedDate = date.toISOString().split("T")[0];
    try {
      const response = await axios.get(
        `https://www.nbrb.by/api/exrates/rates?ondate=${formattedDate}&periodicity=0`
      );
      setCurrencies(response.data);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  return (
    <div className="section-1">
      <h1 className="text-well-1">Курсы валют на определенную дату</h1>
      <div className="subsection-1">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Выберите дату"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          id="button-well-1"
          variant="contained"
          onClick={fetchCurrencies}
        >
          Получить курсы
        </Button>
      </div>
      <ul>
        {currencies.map((currency) => (
          <li key={currency.Cur_ID}>
            {currency.Cur_Name}: {currency.Cur_OfficialRate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyByDate;
