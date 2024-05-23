import React from "react";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  
  return (
    <div>
      <Header />
      <h1>Wishlist</h1>
      <button onClick={handleHome}>Home</button>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((stock, index) => (
          <div key={index} className="wishlist-card">
            <h2>
              {stock.name} ({stock.symbol})
            </h2>
            <p>Current Price: ${stock.c}</p>
            <p>Close Price: ${stock.pc}</p>
            <button onClick={() => removeFromWishlist(stock)}>
              Remove from Wishlist
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
