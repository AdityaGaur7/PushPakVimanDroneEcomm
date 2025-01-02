
import React from 'react';
import "./trending.css";

const TrendingComponent = ({ topSoldProducts }) => {
    return (
        <div className="container text-center my-5">
            <h2 className="font-weight-bold mb-5">TRENDING NOW</h2>
            <div className="row">
                {topSoldProducts.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <a href={`products/${product.id}`}>
                            <div className="card border text-center card-hover">
                                <div className="position-relative">
                                    <img src={product.images[0]} className="card-img-top" alt={product.name} />
                                    <div className="overlay">
                                        <p className="text-muted">{product.description}</p>
                                        <h5 className="font-weight-bold">{product.name}</h5>
                                        <p className="font-weight-bold">$ {product.price}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingComponent;