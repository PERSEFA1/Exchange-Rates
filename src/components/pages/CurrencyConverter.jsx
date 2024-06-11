import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { fetchCurrencyConversionRate } from "../../api/currencyApi";
import "./Converter.css";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
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
        <FormControl>
          <InputLabel id="from-currency-label">Из валюты</InputLabel>
          <Select
            labelId="from-currency-label"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <MenuItem value="145">USD</MenuItem>
            <MenuItem value="292">EUR</MenuItem>
            <MenuItem value="298">RUB</MenuItem>
            {/* Add other currencies as needed */}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="to-currency-label">В валюту</InputLabel>
          <Select
            labelId="to-currency-label"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <MenuItem value="145">USD</MenuItem>
            <MenuItem value="292">EUR</MenuItem>
            <MenuItem value="298">RUB</MenuItem>
            {/* Add other currencies as needed */}
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
      </div>
      {conversionResult !== null && (
        <div>Результат конвертации: {conversionResult}</div>
      )}
    </div>
  );
};

export default CurrencyConverter;
