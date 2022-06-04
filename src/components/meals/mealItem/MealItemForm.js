import { useRef, useState } from 'react';
import Input from '../../ui/Input';
import classes from './MealItemForm.module.css'
function MealItemForm(props) {
    const amountInputRef = useRef()
    const [valid, setvalid] = useState(true);
    const submitHandler = event => {
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setvalid(false)
            return
        }

        props.onAddToCart(enteredAmountNumber)
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount"
                ref={amountInputRef}
                input={{
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!valid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;