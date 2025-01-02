import { useState, useEffect } from "react";
import Layout from "../../MainComponent/Layout.jsx";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import axios from "axios";
import { API_URL } from "../../api.js";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FaEdit, FaSearch, FaFilter } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories] = useState(["All", "Drone", "3D-Printing-Object", "IOT-component"]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || selectedCategory === "" || 
                          prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 admin-sidebar">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-main">
              <div className="content-header">
                <h2>Products Management</h2>
                <p className="text-muted">Manage and organize your product inventory</p>
              </div>

              <div className="products-controls mb-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="search-box">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="filter-box">
                      <FaFilter className="filter-icon" />
                      <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <NavLink to="/dashboard/admin/create-product" className="btn btn-primary w-100">
                      Add Product
                    </NavLink>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((prod) => (
                    <div key={prod._id} className="product-card">
                      <div className="product-image">
                        <img src={prod.image} alt={prod.name} />
                       
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">{prod.name}</h3>
                        <p className="product-description">
                          {prod.description.substring(0, 100)}...
                        </p>
                        <div className="product-footer">
                          <span className="product-price">₹{prod.price}</span>
                          <span className="product-category">{prod.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No products found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
