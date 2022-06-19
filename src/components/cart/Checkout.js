import { useContext, useState } from 'react'
import { CartHandlerContext } from '../../store/CartHandlerProvider'
import classes from './Checkout.module.css'

export default function Checkout(props) {
    const { hideCartHandler } = useContext(CartHandlerContext)
    const [isDetailEmpty, setisDetailEmpty] = useState([]);

    const [details, setdetails] = useState({
        name: "",
        street: "",
        postCode: "",
        city: ""
    });

    const inputHandler = (e) => {
        e.preventDefault()
        const { id, value } = e.target
        setdetails(prev => {
            return { ...prev, [id]: value }
        })
        const filter = isDetailEmpty.filter(data => data.id !== e.target.id)
        setisDetailEmpty(filter)
    }

    const inputBlurHandler = (e) => {
        e.preventDefault()
        let tempArray = [...isDetailEmpty]
        if (e.target.value.trim() === "") {
            const filter = tempArray.find(data => data.id === e.target.id)
            !filter && tempArray.push({ id: e.target.id, value: true })
            setisDetailEmpty(tempArray)
            return
        }
        const filter = tempArray.filter(data => data.id !== e.target.id)
        filter.length && setisDetailEmpty(filter)
    }

    const checkEmptyInput = (customId) => {
        const filter = isDetailEmpty.find(data => data.id === customId && data.value === true)
        if (filter) {
            return true
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (details.name !== "" || details.city !== "" || details.postCode !== "" || details.street !== "") {
            props.onSubmit(details)
        }
    }

    return (
        <form onSubmit={submitForm} className={classes.form}>
            <div className={`${classes.control} ${checkEmptyInput("name") && classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input onChange={inputHandler} onBlur={inputBlurHandler} value={details.name} type="text" id='name' />
                {checkEmptyInput("name") && <p>Name field is empty</p>}
            </div>
            <div className={`${classes.control} ${checkEmptyInput("street") && classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input onChange={inputHandler} onBlur={inputBlurHandler} value={details.street} type="text" id="street" />
                {checkEmptyInput("street") && <p>Field is empty</p>}
            </div>
            <div className={`${classes.control} ${checkEmptyInput("postCode") && classes.invalid}`}>
                <label htmlFor='postCode'>Post Code</label>
                <input onChange={inputHandler} onBlur={inputBlurHandler} value={details.postCode} type="text" id="postCode" />
                {checkEmptyInput("postCode") && <p>Field is empty</p>}
            </div>
            <div className={`${classes.control} ${checkEmptyInput("city") && classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input onChange={inputHandler} onBlur={inputBlurHandler} value={details.city} type="text" id="city" />
                {checkEmptyInput("city") && <p>Field is empty</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={hideCartHandler}>Cancel</button>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}