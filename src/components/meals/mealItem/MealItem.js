import { useContext } from 'react';
import { CartContext } from '../../../store/CartProvider';
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
function MealItem(props) {
    // always render 2 decimal places
    const price = `$${props.price.toFixed(2)}`
    const { addItem } = useContext(CartContext)

    const addToCard = (amount) => {
        addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>

            <div>
                <MealItemForm onAddToCart={addToCard} />
            </div>
        </li>
    );
}

export default MealItem;