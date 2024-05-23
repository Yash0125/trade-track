// // src/api.js
// import axios from "axios";

// const API_KEY = "cp4r89pr01qnnlpc0s00cp4r89pr01qnnlpc0s0g";

// export const getStockData = async (symbol) => {
//   const response = await axios.get(
//     `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
//   );
//   return response.data;
// };

// export const getStockSymbols = async () => {
//   const response = await axios.get(
//     `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
//   );
//   return response.data;
// };

// api.js
import axios from "axios";

const API_TOKEN = process.env.REACT_APP_FINNHUB_API_KEY;

export const getStockSymbols = async () => {
  try {
    const response = await axios.get("https://finnhub.io/api/v1/stock/symbol", {
      params: {
        exchange: "US",
        token: API_TOKEN,
      },
    });
    return response.data.slice(0, 20);
  } catch (error) {
    console.error("Error fetching stock symbols:", error);
    return [];
  }
};

export const getQuoteData = async (symbol) => {
  try {
    const response = await axios.get("https://finnhub.io/api/v1/quote", {
      params: {
        symbol,
        token: API_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quote data:", error);
    return {};
  }
};

export const getCompanyProfile = async (symbol) => {
  try {
    const response = await axios.get(
      "https://finnhub.io/api/v1/stock/profile2",
      {
        params: {
          symbol,
          token: API_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return {};
  }
};
