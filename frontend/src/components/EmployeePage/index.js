import { useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const employeeName = "Employee"; // Fetch the employee's name from backend if required

  return (
    <h1>hello employee</h1>
  );

};

export default EmployeeDashboard;
