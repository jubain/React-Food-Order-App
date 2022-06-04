import { createContext, useReducer } from "react";

export const CartContext = createContext()

const cartReducer = (state, action) => {
    let updatedTotalAmount
    let existingCartItemIndex
    let existingCartItem
    let updatedItemsList
    let updatedExistingItem
    switch (action.type) {
        case "ADD_ITEM":
            //concat gives brand new array without editing old array
            updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
            // Finding index
            existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
            // Getting element with above index
            existingCartItem = state.items[existingCartItemIndex]
            // If a element exist
            if (existingCartItem) {
                // update the element value in the item list
                updatedExistingItem = {
                    ...existingCartItem, amount: existingCartItem.amount + action.item.amount
                }
                updatedItemsList = [...state.items]
                // update the item list
                updatedItemsList[existingCartItemIndex] = updatedExistingItem
            } else {
                updatedItemsList = state.items.concat(action.item)
            }
            return {
                items: updatedItemsList,
                totalAmount: updatedTotalAmount
            }

        case "REMOVE_ITEM":
            existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
            existingCartItem = state.items[existingCartItemIndex]
            // removing existing price from total amount
            updatedTotalAmount = state.totalAmount - existingCartItem.price
            if (existingCartItem.amount === 1) {
                // Remove amount 
                updatedItemsList = state.items.filter(item => item.id !== action.id)
            } else {
                // Decrease amount by 1
                updatedExistingItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
                updatedItemsList = [...state.items]
                // Update list with new item amount
                updatedItemsList[existingCartItemIndex] = updatedExistingItem
            }
            return {
                items: updatedItemsList,
                totalAmount: updatedTotalAmount
            }
        default:
            break;
    }
    return defaultCartState
}

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item: item })
    }
    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", id: id })
    }

    const value = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItem,
        removeItem: removeItem
    }


    return <CartContext.Provider value={value}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;