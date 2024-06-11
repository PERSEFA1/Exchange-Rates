export const fetchCurrencyDynamics = async (startDate, endDate, currencyId) => {
  try {
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    const response = await fetch(
      `https://api.nbrb.by/exrates/rates/dynamics/${currencyId}?startdate=${startDateString}&enddate=${endDateString}`
    );
    if (!response.ok) {
      throw new Error("Ошибка Запроса");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка", error);
    throw error;
  }
};

export const fetchCurrencyConversionRate = async (
  fromCurrencyId,
  toCurrencyId,
  date
) => {
  try {
    const responseFrom = await fetch(
      `https://api.nbrb.by/exrates/rates/${fromCurrencyId}?ondate=${date}`
    );
    const responseTo = await fetch(
      `https://api.nbrb.by/exrates/rates/${toCurrencyId}?ondate=${date}`
    );

    if (!responseFrom.ok || !responseTo.ok) {
      throw new Error("Ошибка запроса");
    }

    const fromRate = await responseFrom.json();
    const toRate = await responseTo.json();

    const conversionRate =
      (fromRate.Cur_OfficialRate /
        toRate.Cur_OfficialRate /
        fromRate.Cur_Scale) *
      toRate.Cur_Scale;
    return conversionRate;
  } catch (error) {
    console.error("Ошибка", error);
    throw error;
  }
};
