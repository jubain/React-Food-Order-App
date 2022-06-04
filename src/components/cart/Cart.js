import Modal from '../ui/Modal';
import classes from './Cart.module.css'
function Cart(props) {
    const cartItems =
        <ul className={classes['cart-items']}>
            {[{ id: 'c1', name: 'sushi', amount: 2, price: 12.99 }].map(data => <li>{data.name}</li>)}
        </ul>

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;