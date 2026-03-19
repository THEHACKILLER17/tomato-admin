import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./components/Pages/Orders/Orders";
import Foods from "./components/Pages/Foods/Foods";
import "./App.css";
import AddFood from "./components/Pages/AddFood/AddFood";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;