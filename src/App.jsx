import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import ExpensesTracker from './pages/expense-tracker/index';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Auth />} />
          <Route path='/expense-tracker' element={<ExpensesTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
