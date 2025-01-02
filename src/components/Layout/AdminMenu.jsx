import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaPlus } from 'react-icons/fa';
import "./AdminMenu.css";

const AdminMenu = () => {
  const menuItems = [
    { path: "/dashboard/admin", name: "Dashboard", icon: <FaHome /> },
    { path: "/dashboard/admin/products", name: "Products", icon: <FaBox /> },
    { path: "/dashboard/admin/create-product", name: "Add Product", icon: <FaPlus /> },
    // { path: "/dashboard/admin/users", name: "Users", icon: <FaUsers /> },
    { path: "/dashboard/admin/orders", name: "Orders", icon: <FaShoppingCart /> },
  ];

  return (
    <div className="admin-menu">
      <h4 className="menu-title">Admin Panel</h4>
      <nav className="nav flex-column">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminMenu;
