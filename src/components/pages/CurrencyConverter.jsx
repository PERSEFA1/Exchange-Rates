import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { fetchCurrencyConversionRate } from "../../api/currencyApi";
import "./style/Converter.css";

const CurrencyConverter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromCurrency, setFromCurrency] = useState(
    searchParams.get("fromCurrency")
      ? new Date(searchParams.get("fromCurrency"))
      : ""
  );
  const [toCurrency, setToCurrency] = useState(
    searchParams.get("toCurrency")
      ? new Date(searchParams.get("toCurrency"))
      : ""
  );
  const [amount, setAmount] = useState("");
  const [conversionResult, setConversionResult] = useState(null);

  const handleConvert = async () => {
    if (fromCurrency && toCurrency && amount) {
      const rate = await fetchCurrencyConversionRate(
        fromCurrency,
        toCurrency,
        new Date().toISOString().split("T")[0]
      );
      setConversionResult(rate * amount);
    }
  };

  return (
    <div className="section-2">
      <h1 className="text-well-2">Конвертер валют</h1>
      <div className="subsection-2">
        <FormControl id="from-currency">
          <InputLabel id="from-currency-label">Из валюты</InputLabel>
          <Select
            labelId="from-currency-label"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <MenuItem value="431">USD</MenuItem>
            <MenuItem value="451">EUR</MenuItem>
            <MenuItem value="456">RUB</MenuItem>
          </Select>
        </FormControl>
        <FormControl id="to-currency">
          <InputLabel id="to-currency-label">В валюту</InputLabel>
          <Select
            labelId="to-currency-label"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <MenuItem value="431">USD</MenuItem>
            <MenuItem value="451">EUR</MenuItem>
            <MenuItem value="456">RUB</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button id="button-well-2" variant="contained" onClick={handleConvert}>
          Конвертировать
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
      {conversionResult !== null && (
        <div>Результат конвертации: {conversionResult}</div>
      )}
    </div>
  );
};

export default CurrencyConverter;
