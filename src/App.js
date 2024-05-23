import { useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wishlist from './pages/Wishlist/Wishlist';

function App() {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (stock) => {
    if (!wishlist.some((item) => item.symbol === stock.symbol)) {
      setWishlist([...wishlist, stock]);
    }
  };

  const removeFromWishlist = (stock) => {
    setWishlist(wishlist.filter((item) => item.symbol !== stock.symbol));
  };

  return (
    <div className='app-container'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home addToWishlist={addToWishlist} />} />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
