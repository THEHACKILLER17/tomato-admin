import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./components/Pages/Orders/Orders";
import Foods from "./components/Pages/Foods/Foods";
import AddFood from "./components/Pages/AddFood/AddFood";
import Login from "./components/Pages/Login/Login";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import "./App.css";

const App = () => {
  const isAuth = localStorage.getItem("adminAuth") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <AdminProtectedRoute>
            <div className="admin-layout">
              <Sidebar />
              <main className="admin-main">
                <Routes>
                  <Route path="/" element={<Orders />} />
                  <Route path="/foods" element={<Foods />} />
                  <Route path="/add-food" element={<AddFood />} />
                </Routes>
              </main>
            </div>
          </AdminProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;