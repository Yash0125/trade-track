import "./Home.css";
import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
import {
  getStockSymbols,
  getQuoteData,
  getCompanyProfile,
} from "./../../utils/api";

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

  if (loading) {
    return (
      <>
        <Header />
        <h1>loading</h1>
      </>
    );
  }
  return (
    <div className="home-container">
      <Header />
      <div className="card-container">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <p className="stock-title"><span className="title-left">Name:</span> {stock.name?stock.name: stock.symbol}</p>
            <hr />
            <p className="stock-description"><span className="stock-left">Symbol:</span> {stock.symbol}</p>
            <p className="stock-description"><span className="stock-left">Price:</span> ${stock.c}</p>
            <p className="stock-description"><span className="stock-left">Close Price:</span> ${stock.pc}</p>
            <button className="wishlist-btn" onClick={() => addToWishlist(stock)}>
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
