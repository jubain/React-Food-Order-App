import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './mealItem/MealItem';

const AvailableMeals = () => {
    const [mealData, setmealData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, sethttpError] = useState(null);
    const getMeals = async () => {
        const meals = await fetch("https://react-http-2ce12-default-rtdb.firebaseio.com/meals.json", {
            method: "GET",
        })
        if (!meals.ok) {
            throw new Error("Something went wrong")
        }
        const data = await meals.json()
        const loadedMeals = []
        for (const key in data) {
            loadedMeals.push({
                id: key,
                name: data[key].name,
                description: data[key].description,
                price: data[key].price
            })
        }
        setmealData(loadedMeals)
        setisLoading(false)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            getMeals().catch(error => {
                setisLoading(false)
                sethttpError(error.message)
            })
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    }, [getMeals]);

    if (isLoading) {
        return <section className={classes.mealsLoading}><p>Loading...</p></section>
    }
    if (httpError) {
        return <section className={classes.mealsLoading}><p>{httpError}</p></section>
    }

    const mealsList = mealData.map((meal) => <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />)

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals