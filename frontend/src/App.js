import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';// import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerPage';
import EmployeeDashboard from './components/EmployeePage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;