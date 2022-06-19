import { useContext, useState } from 'react';
import { CartHandlerContext } from '../../store/CartHandlerProvider';
import { CartContext } from '../../store/CartProvider';
import Modal from '../ui/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem';
import Checkout from './Checkout';
function Cart(props) {
    const { hideCartHandler } = useContext(CartHandlerContext)
    const { items, totalAmount, addItem, removeItem } = useContext(CartContext)
    const [orderButtonClicked, setorderButtonClicked] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);

    const onRemoveItem = (id) => {
        removeItem(id)
    }

    const onAddItem = (item) => {
        let tempItem = { ...item }
        tempItem.amount = 1
        addItem(tempItem)
    }

    const orderHandler = () => {
        setorderButtonClicked(true)
    }

    const submitOrderHandler = async (userData) => {
        setisSubmitting(true)
        try {
            const response = await fetch("https://react-http-2ce12-default-rtdb.firebaseio.com/orders.json",
                {
                    method: "POST",
                    body: JSON.stringify({
                        user: userData,
                        orderedItem: items
                    })
                }
            )
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            setisSubmitting(false)
            didSubmit(true)
        } catch (error) {
            console.log(error.message)
        }

    }


    const cartItems = (
        <ul className={classes['cart-items']}>
            {items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={onAddItem.bind(null, item)}
                    onRemove={onRemoveItem.bind(null, item.id)}
                />)}
        </ul>
    )

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
            </div>
            {orderButtonClicked && <Checkout onSubmit={submitOrderHandler} />}
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={hideCartHandler}>Close</button>
                {items.length > 0 && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>
        </>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = <p>Successfully sent the order!</p>
    return (
        <Modal onClick={hideCartHandler}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && !isSubmitting && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;