import { useMeals } from './MealsContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useMealForm } from './useMealForm';
import '../styles/styles.css'

const Form = () => {
    const { addMeal, updateMeal, currentMeal } = useMeals();
    const params = useParams();
    const navigate = useNavigate();

    const backLink = currentMeal 
    ? `/meals/${params.mealId}/details` 
    : '/meals';
    
    const backText = currentMeal ? 'back to meal' : 'back to home';

    if (params.mealId && !currentMeal) {
        return <div>Meal not found</div>;
    }

    const initialData = currentMeal || {}; 
    const { formData, errors, handleChange, validate } = useMealForm(initialData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (currentMeal) {
        updateMeal(params.mealId, formData)
            .then(() => navigate('/meals'))
            .catch(error => console.error('Update error:', error));
        } else {
        addMeal(formData)
            .then(() => navigate('/meals'))
            .catch(error => console.error('Add error:', error));
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <h1>Speedy Meals</h1>
                <Link to={backLink}>{backText}</Link>
            </div>
            <div className='sub-header'>
                {currentMeal 
                ? `Update ${currentMeal.name} recipe` 
                : 'Add the next culinary masterpiece!'
                }
            </div>
        <form className='form' onSubmit={handleSubmit}>
            <div className='two-columns'>
            <div className='left-column'>
                <label>Dish Name</label>
                <input 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange} 
                />
                {errors.name && <div className="error">{errors.name}</div>}
            
                <label>Total Minutes</label>
                <input 
                type="number" 
                name="totalMinutes" 
                value={formData.totalMinutes || ''} 
                onChange={handleChange} 
                />
                {errors.totalMinutes && <div className="error">{errors.totalMinutes}</div>}
                <label>Directions:</label>
                <input 
                name="directions" 
                value={formData.directions || ''} 
                onChange={handleChange} 
                />
                {errors.directions && <div className="error">{errors.directions}</div>}
                <button 
                    className='style-button' 
                    type="submit"
                    >
                    <i className={currentMeal ? 'fa-solid fa-upload' : 'fa-solid fa-pencil'}></i>
                    {currentMeal ? 'Update' : 'Create'}
                </button>
            </div>

            <div className='ingredients'>
                <p>Ingredient(s) - Optional</p>
                <label>Ingredient One</label>
                <input 
                name="ingredientOne" 
                value={formData.ingredientOne || ''} 
                onChange={handleChange} 
                />
                <label>Ingredient Two</label>
                <input 
                name="ingredientTwo" 
                value={formData.ingredientTwo || ''} 
                onChange={handleChange} 
                />
                <label>Ingredient Three</label>
                <input 
                name="ingredientThree" 
                value={formData.ingredientThree || ''} 
                onChange={handleChange} 
                />
            </div>
            </div>

            

            
        </form>
        </div>
    );
};

export default Form