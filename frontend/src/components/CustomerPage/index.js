import { useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const customerName = "Customer"; // Fetch the customer's name from backend if required

  return (
    <h1>hello customer</h1>
  );
};

export default CustomerDashboard;
