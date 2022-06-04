
import { useContext } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import { CartHandlerContext } from "./store/CartHandlerProvider";
import { CartContext } from "./store/CartProvider";

function App() {
  const { cartIsShown } = useContext(CartHandlerContext)

  return (
    <>
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
