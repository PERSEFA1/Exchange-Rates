import React, { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState(null);

  const convertCurrency = async () => {
    try {
      const fromResponse = await axios.get(
        `https://www.nbrb.by/api/exrates/rates/${fromCurrency}`
      );
      const toResponse = await axios.get(
        `https://www.nbrb.by/api/exrates/rates/${toCurrency}`
      );
      const fromRate = fromResponse.data.Cur_OfficialRate;
      const toRate = toResponse.data.Cur_OfficialRate;
      const convertedAmount = ((amount * fromRate) / toRate).toFixed(2);
      setResult(convertedAmount);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div>
      <h1>Конвертер валют</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
      />
      <input
        type="text"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        placeholder="Из валюты (ID)"
      />
      <input
        type="text"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        placeholder="В валюту (ID)"
      />
      <button onClick={convertCurrency}>Конвертировать</button>
      {result && <h2>Результат: {result}</h2>}
    </div>
  );
};

export default CurrencyConverter;
