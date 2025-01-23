import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../../Context/cart';
import './FloatingCart.css';

const FloatingCart = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <button 
      className="floating-cart-btn"
      onClick={() => navigate('/cart')}
      aria-label="Shopping Cart"
    >
      <BsCart3 size={24} />
      {cart?.length > 0 && <span className="floating-cart-count">{cart.length}</span>}
    </button>
  );
};

export default FloatingCart; 