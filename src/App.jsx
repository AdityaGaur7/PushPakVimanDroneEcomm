import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./MainComponent/Home/Home.jsx";
import LoginComponent from "./pages/Auth/login/Login.jsx";
import SignupComponent from "./pages/Auth/signup/Signup.jsx";
import FaqComponent from "./pages/Page/faq/FAQ.jsx";
import AboutComponent from "./pages/Page/about/About.jsx";
import ContactComponent from "./pages/Page/contact/Contact.jsx";
import ServicesComponent from "./pages/Page/services/Services.jsx";
import SearchAllComponent from "./pages/Allproduct/AllProduct.jsx";
import Private from "./Routes/Private.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import Orders from "./pages/user/Orders.jsx";
import Profile from "./pages/user/Profile.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Users from "./pages/Admin/Users.jsx";
import Products from "./pages/Admin/Products.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";
import Cart from "./components/Cart/cart.jsx";
import ProductSearch from "./pages/product-search/Product-search.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          
          <Route path="/faq" element={<FaqComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/contact" element={<ContactComponent />} />
          <Route path="/dashboard" element={<Private />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />

            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="/services" element={<ServicesComponent />} />
          <Route path="/products" element={<SearchAllComponent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails/:slug" element={<ProductDetails />} />
          <Route path="/product/:keyword" element={<ProductSearch />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
