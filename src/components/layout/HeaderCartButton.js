import { useContext, useEffect, useState } from 'react'
import { CartHandlerContext } from '../../store/CartHandlerProvider'
import { CartContext } from '../../store/CartProvider'
import CartIcon from '../cart/CartIcon'
import classes from './HeaderCartButton.module.css'
const HeaderCartButton = (props) => {
    const { items, totalAmount } = useContext(CartContext)
    const { showCartHandler } = useContext(CartHandlerContext)

    const [btnIsAnimated, setbtnIsAnimated] = useState(false);

    // reduce transform array into single value
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ""}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setbtnIsAnimated(true)
        const timer = setTimeout(() => {
            setbtnIsAnimated(false)
        }, 300);
        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={showCartHandler}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}
export default HeaderCartButton