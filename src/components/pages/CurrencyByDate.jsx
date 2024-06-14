import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import "./style/ByDate.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const CurrencyByDate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState(
    searchParams.get("date") ? new Date(searchParams.get("date")) : ""
  );
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrencies = async () => {
    if (!date) return;
    const formattedDate = date.toISOString().split("T")[0];
    setSearchParams({ date: date });
    try {
      const response = await axios.get(
        `https://www.nbrb.by/api/exrates/rates?ondate=${formattedDate}&periodicity=0`
      );
      setCurrencies(response.data);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

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
        <Button
          id="button-4"
          variant="contained"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          Поделиться
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
