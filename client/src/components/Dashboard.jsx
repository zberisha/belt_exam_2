import { useMeals } from './MealsContext';
import { Link } from 'react-router-dom';
import '../styles/styles.css'

const Dashboard = () => {
    const { meals } = useMeals();

    return (
        <div className='container'>
            <div className='header'>
                <h1>Speedy Meals</h1>
                <Link to="/meals/new">add a meal</Link>
            </div>
            <div className='sub-header'>Find inspiration with these delicious meals</div>
            <table className='main-table'>
                <thead>
                    <tr>
                        <th>Meal</th>
                        <th>Prep Time</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map(meal => (
                        <tr key={meal._id}>
                            <td>
                                {meal.name}
                                {meal.ingredientOne && meal.ingredientTwo && meal.ingredientThree && (
                                    <span className="star-icon">⭐</span>
                                )}
                            </td>
                            <td>{meal.totalMinutes} minutes</td>
                            <td>
                                <Link to={`/meals/${meal._id}/details`}>details</Link> | 
                                <Link to={`/meals/${meal._id}/edit`}>edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;