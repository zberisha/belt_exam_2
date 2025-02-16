import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [currentMeal, setCurrentMeal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeals();
    }, []);


    const location = useLocation();

    useEffect(() => {
        const fetchMealIfRouteMatches = () => {
            const mealIdMatch = location.pathname.match(/\/meals\/([^/]+)(\/edit|\/details)?/);
            if (mealIdMatch) {
                const mealId = mealIdMatch[1];
                fetchMealById(mealId);
            }
        };

        fetchMealIfRouteMatches();
    }, [location]); // Re-run when location changes


    const fetchMeals = () => {
        axios.get('http://localhost:8000/meals')
        .then(response => setMeals(response.data))
        .catch(error => console.error('Error fetching meals:', error));
    };


    const fetchMealById = (id) => {
        axios.get(`http://localhost:8000/meals/${id}`)
            .then(response => setCurrentMeal(response.data))
            .catch(() => setCurrentMeal(null));
    };

    const addMeal = (mealData) => {
        axios.post('http://localhost:8000/meals', mealData)
        .then(response => {
            setMeals([...meals, response.data]);
            navigate('/meals');
        })
        .catch(error => console.error('Error adding meal:', error));
    };

    const updateMeal = (id, mealData) => {
        axios.put(`http://localhost:8000/meals/${id}`, mealData)
        .then(() => {
            setMeals(meals.map(meal => 
            meal._id === id ? { ...meal, ...mealData } : meal
            ));
            navigate('/meals');
        })
        .catch(error => console.error('Error updating meal:', error));
    };

    const deleteMeal = (id) => {
        axios.delete(`http://localhost:8000/meals/${id}`)
        .then(() => {
            setMeals(meals.filter(meal => meal._id !== id));
            navigate('/meals');
        })
        .catch(error => console.error('Error deleting meal:', error));
    };

    return (
        <MealsContext.Provider value={{ meals, currentMeal, setCurrentMeal, addMeal, updateMeal, deleteMeal }}>
        {children}
        </MealsContext.Provider>
    );
};

export const useMeals = () => useContext(MealsContext);

