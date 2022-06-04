import { useContext } from 'react';
import { CartHandlerContext } from '../../store/CartHandlerProvider';
import { CartContext } from '../../store/CartProvider';
import Modal from '../ui/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem';
function Cart(props) {
    const { hideCartHandler } = useContext(CartHandlerContext)
    const { items, totalAmount, addItem, removeItem } = useContext(CartContext)

    const onRemoveItem = (id) => {
        removeItem(id)
    }

    const onAddItem = (item) => {
        let tempItem = { ...item }
        tempItem.amount = 1
        addItem(tempItem)
    }


    const cartItems = (
        <ul className={classes['cart-items']}>
            {items.map(item => <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={onAddItem.bind(null, item)}
                onRemove={onRemoveItem.bind(null, item.id)}
            />)}
        </ul>
    )


    return (
        <Modal onClick={hideCartHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={hideCartHandler}>Close</button>
                {items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;