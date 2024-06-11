export const fetchCurrencyRatesByDate = async (date) => {
  try {
    const response = await fetch(
      `https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch currency rates");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
};

export const fetchCurrencyDynamics = async (startDate, endDate, currencyId) => {
  try {
    const response = await fetch(
      `https://www.nbrb.by/api/exrates/rates/dynamics/${currencyId}?startdate=${startDate}&enddate=${endDate}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch currency dynamics");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency dynamics:", error);
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
      `https://www.nbrb.by/api/exrates/rates/${fromCurrencyId}?ondate=${date}`
    );
    const responseTo = await fetch(
      `https://www.nbrb.by/api/exrates/rates/${toCurrencyId}?ondate=${date}`
    );

    if (!responseFrom.ok || !responseTo.ok) {
      throw new Error("Failed to fetch currency rates for conversion");
    }

    const fromRate = await responseFrom.json();
    const toRate = await responseTo.json();

    const conversionRate = fromRate.Cur_OfficialRate / toRate.Cur_OfficialRate;
    return conversionRate;
  } catch (error) {
    console.error("Error fetching currency conversion rate:", error);
    throw error;
  }
};
