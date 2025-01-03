import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api.js";
import toast from "react-hot-toast";
import Layout from "../../MainComponent/Layout.jsx";
import { useCart } from "../../Context/cart.jsx";
import { useNavigate } from "react-router-dom";
import { Modal, Select, Input } from "antd";
import { FiShoppingCart, FiHeart, FiFilter, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const { Option } = Select;

const HomePage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(['Drone', '3D-Printing-Object', 'IOT-component']);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cart, setCart } = useCart();
  const [checked, setChecked] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [checked, sortBy, searchTerm, product]);

  useEffect(() => {
    // Reset to first page when filters, search, or sort changes
    setCurrentPage(1);
  }, [checked, sortBy, searchTerm]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        setFilteredProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  const filterAndSortProducts = () => {
    let tempProducts = [...product];

    // Filter by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter(
        prod => prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected categories
    if (checked.length > 0) {
      tempProducts = tempProducts.filter(prod => checked.includes(prod.category));
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(tempProducts);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingProductIndex >= 0) {
      // Product already in cart, update quantity
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Product not in cart, add with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  };

  const handlePageChange = (pageNumber) => {
    // Ensure page number is within valid range
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
    
    // Scroll to top of the products section smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Layout title={"All Products"} description={"Browse all products"}>
      <div className="container py-4">
        {/* Search and Filter Bar */}
        <div className="search-filter-bar mb-4">
          <div className="input-group">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          
          <div className="filter-controls d-flex justify-content-between p-4">
            <Select
              defaultValue="default"
              onChange={setSortBy}
              className="sort-select"
            >
              <Option value="default">Sort By</Option>
              <Option value="price-asc">Price: Low to High</Option>
              <Option value="price-desc">Price: High to Low</Option>
              <Option value="name-asc">Name: A to Z</Option>
              <Option value="name-desc">Name: Z to A</Option>
            </Select>

            <button 
              className="btn btn-outline-primary"
              onClick={() => setIsModalVisible(true)}
            >
              <FiFilter className="me-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Modal */}
        <Modal
          title="Filter Products"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <button 
              key="reset" 
              className="btn btn-outline-danger me-2"
              onClick={() => {
                setChecked([]);
                setIsModalVisible(false);
              }}
            >
              Reset
            </button>,
            <button
              key="apply"
              className="btn btn-primary"
              onClick={() => setIsModalVisible(false)}
            >
              Apply
            </button>
          ]}
        >
          <div className="category-filters">
            <h6 className="mb-3">Categories</h6>
            {category.map((cat, index) => (
              <div key={index} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checked.includes(cat)}
                  onChange={() => {
                    const updatedChecked = checked.includes(cat)
                      ? checked.filter(c => c !== cat)
                      : [...checked, cat];
                    setChecked(updatedChecked);
                  }}
                />
                <label className="form-check-label">{cat}</label>
              </div>
            ))}
          </div>
        </Modal>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {currentProducts.map((product) => (
              <motion.div
                key={product._id}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card h-100 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    
                  </div>
                  
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="h5 text-primary mb-0">
                        ${product.price}
                      </span>
                      <div>
                        <FiShoppingCart />
                      <button
                      onClick={() => addToCart(product)}
                      className="btn btn-light"
                    >Add to Cart 
                    </button>
                      </div>
                      {/* <button className="btn btn-outline-danger btn-sm">
                        <FiHeart />
                      </button> */}
                    </div>
                    <button
                      onClick={() => navigate(`/productdetails/${product.slug}`)}
                      className="btn btn-outline-primary w-100"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h3 className="text-secondary">No products found</h3>
          </div>
        )}

        {/* Pagination */}
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li 
                key={index + 1} 
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default HomePage;
