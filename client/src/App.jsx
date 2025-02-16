import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MealsProvider } from './components/MealsContext';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Details from './components/Details';

export default function App() {
  return (
    <Router>
      <MealsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meals" element={<Dashboard />} />
            <Route path="/meals/new" element={<Form />} />
            <Route path="/meals/:mealId/edit" element={<Form />} />
            <Route path="/meals/:mealId/details" element={<Details />} />
          </Routes>
      </MealsProvider>
    </Router>
  );
}