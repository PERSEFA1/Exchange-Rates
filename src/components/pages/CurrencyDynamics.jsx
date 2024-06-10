import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const CurrencyDynamics = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [data, setData] = useState({});

  const fetchDynamics = async () => {
    try {
      const response = await axios.get(
        `https://www.nbrb.by/api/exrates/rates/dynamics/${currencyId}?startdate=${startDate}&enddate=${endDate}`
      );
      const rates = response.data;
      const labels = rates.map((rate) => rate.Date);
      const values = rates.map((rate) => rate.Cur_OfficialRate);

      setData({
        labels,
        datasets: [
          {
            label: "Курс валюты",
            data: values,
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Динамика курса валют</h1>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID валюты"
        value={currencyId}
        onChange={(e) => setCurrencyId(e.target.value)}
      />
      <button onClick={fetchDynamics}>Получить динамику</button>
      {data.labels && <Line data={data} />}
    </div>
  );
};

export default CurrencyDynamics;
