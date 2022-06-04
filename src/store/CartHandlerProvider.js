import { createContext, useState } from "react";

export const CartHandlerContext = createContext()

function CartHandlerProvider(props) {
    const [cartIsShown, setcartIsShown] = useState(false);
    function showCartHandler() {
        setcartIsShown(true)
    }
    function hideCartHandler() {
        setcartIsShown(false)
    }

    return <CartHandlerContext.Provider value={{ cartIsShown, showCartHandler, hideCartHandler }}>
        {props.children}
    </CartHandlerContext.Provider>
}

export default CartHandlerProvider