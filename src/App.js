import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartIsShow, setCartIsShow] = useState(false);

  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  const showCartHandler = () => {
    setCartIsShow(true);
  };

  return (
    <CartProvider>
      {cartIsShow && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
