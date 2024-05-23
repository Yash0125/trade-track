import "./Home.css";
import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
import { getStockSymbols, getQuoteData, getCompanyProfile } from "./../../utils/api";

const Home = ({ addToWishlist }) => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const storedStockData = localStorage.getItem("stockData");
      if (storedStockData) {
        setStocks(JSON.parse(storedStockData));
        setLoading(false);
      } else {
        fetchData();
      }
    }, []);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const symbols = await getStockSymbols();
        const stockData = await Promise.all(
          symbols.map(async (symbol) => {
            const [quoteResponse, profileResponse] = await Promise.all([
              getQuoteData(symbol.symbol),
              getCompanyProfile(symbol.symbol),
            ]);
            return {
              symbol: symbol.symbol,
              name: profileResponse.name || symbol.symbol,
              c: quoteResponse.c || 0,
              pc: quoteResponse.pc || 0,
            };
          })
        );
        setStocks(stockData);
        localStorage.setItem("stockData", JSON.stringify(stockData));
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <div className="home-container">
      <Header />
      <div>
      <h1>Stock List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        stocks.map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <p>Name: {stock.name}</p>
            <p>Symbol: {stock.symbol}</p>
            <p>Price: ${stock.c}</p>
            <p>Close Price: ${stock.pc}</p>
            <button onClick={() => addToWishlist(stock)}>
              Add to Wishlist
            </button>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Home;
