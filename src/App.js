import { useState } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);
  function showCartHandler(params) {
    setcartIsShown(true)
  }
  function hideCartHandler(params) {
    setcartIsShown(false)
  }
  return (
    <>
      <CartProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </>
  );
}

export default App;
