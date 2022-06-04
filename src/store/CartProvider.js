import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            //concat gives brand new array without editing old array
            const updatedItems = state.items.concat(action.item)
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        default:
            break;
    }
    return defaultCartState
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item: item })
    }
    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", item: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItem,
        removeItem: removeItem
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;