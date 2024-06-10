import React, { useState } from "react";
import axios from "axios";

const CurrencyByDate = () => {
  const [date, setDate] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(
        `https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`
      );
      setCurrencies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(0);
  };

  return (
    <div>
      <h1>Курсы валют на определенную дату</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchCurrencies}>Получить курсы</button>
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
