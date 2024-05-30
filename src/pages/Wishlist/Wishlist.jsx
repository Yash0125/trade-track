import React from "react";
import "./Wishlist.css";
import Header from "../../components/Header/Header";

const Wishlist = ({ wishlist, removeFromWishlist }) => {

  return (
    <div className="wishlist-container">
      <Header />
      <h1 className="wishlist-title">Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="items-container">
          <p className="items-text">No items in wishlist</p>
        </div>
      ) : (
        <div className="wishlist-card-container">
          {wishlist.map((stock, index) => (
            <div key={index} className="wishlist-card">
              <h2 className="wishlist-card-title">
                {stock.name} ({stock.symbol})
              </h2>
              <p className="stock-description">
                <span className="stock-left">Current Price: </span>${stock.c}
              </p>
              <p className="stock-description">
                <span className="stock-left">Close Price: </span>${stock.pc}
              </p>
              <button
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(stock)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
