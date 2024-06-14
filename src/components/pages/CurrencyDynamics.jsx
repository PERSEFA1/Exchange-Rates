import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { fetchCurrencyDynamics } from "../../api/currencyApi";
import "./style/Dynamics.css";

const CurrencyDynamics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate")
      ? new Date(searchParams.get("startDate"))
      : null
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null
  );
  const [currency, setCurrency] = useState(
    searchParams.get("currency") ? new Date(searchParams.get("currency")) : ""
  );
  const [data, setData] = useState([]);

  const handleFetchData = async () => {
    if (startDate && endDate && currency) {
      const result = await fetchCurrencyDynamics(startDate, endDate, currency);
      setData(result);
    }
  };

  return (
    <div className="section-3">
      <h1 className="text-well-3">Динамика курса валют</h1>
      <div className="subsection-3">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div id="date-picker-1">
            <DatePicker
              label="Дата с"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <DatePicker
            label="Дата по"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl id="currency">
          <InputLabel id="currency-label">Валюта</InputLabel>
          <Select
            labelId="currency-label"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="431">USD</MenuItem>
            <MenuItem value="451">EUR</MenuItem>
            <MenuItem value="456">RUB</MenuItem>
          </Select>
        </FormControl>
        <Button
          id="button-well-3"
          variant="contained"
          onClick={handleFetchData}
        >
          Получить данные
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
      <div>
        {data.length > 0 &&
          data.map((item) => (
            <div key={item.Date}>
              {item.Date}: {item.Cur_OfficialRate}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrencyDynamics;
