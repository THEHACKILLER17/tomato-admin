import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>🍅 Tomato</h2>
        <p>Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          📦 Orders
        </NavLink>
        <NavLink
          to="/foods"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          🍔 Foods
        </NavLink>
        <NavLink
          to="/add-food"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          ➕ Add Food
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
