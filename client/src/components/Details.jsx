import { useMeals } from './MealsContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/styles.css'

const Details = () => {
    const { currentMeal, deleteMeal } = useMeals();
    const navigate = useNavigate();

    const handleRemove = () => {
        deleteMeal(currentMeal._id)
        .then(() => navigate('/meals'))
        .catch(error => console.error('Remove error:', error));
    };

    if (!currentMeal) {
        return <div className="loading">Loading meal details...</div>;
    }
    
    const ingredients = [
        currentMeal.ingredientOne,
        currentMeal.ingredientTwo,
        currentMeal.ingredientThree
    ].filter(Boolean);
    
    const ingredientsText = ingredients.length > 0 
        ? ingredients.join(', ') 
        : 'No ingredients listed';

    return (<>
                <div className='header'>
                    <h1>Speedy Meals</h1>
                    <Link to="/meals">back to home</Link>
                </div>
                <div className='sub-header'>
                    <h2 className='meal-name'>{currentMeal.name} recipe</h2>  <button 
                    onClick={handleRemove} 
                    className="remove-button"
                    >
                    <i class="fa-solid fa-house"></i> Remove
                    </button>
                </div>
            <div className="details-page">       
                <div className="inline">
                    <p className='left-line'>Cook Time </p> <p className='right-line'>{currentMeal.totalMinutes} minutes</p>
                </div>
                <div className="inline">
                    <p className='left-line'>Ingredients </p> <p className='right-line'> {ingredientsText} </p>
                </div>
                <div className="directions">
                    <p className='left-line'>Directions </p>
                        <p>{currentMeal.directions}</p>
                </div>
        </div>
        </>
    );
};

export default Details