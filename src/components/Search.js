import React, { useState } from 'react';
import Layout from './Layout/Layout';
import { useSearch } from '../context/search';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [cart, setCart] = useCart();
    const [values] = useSearch();
    const navigate = useNavigate();

    return (
        <Layout title={'Search results'}>
            <div className="container">
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {
                            values.results.length < 1
                                ? 'No product found'
                                : `Found ${values.results.length}`
                        }
                    </h6>
                    <div className='d-flex flex-wrap'>
                        {values?.results.map((product) => (
                            <div key={product._id} className='col-md-3 mb-4'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
                                        style={{ objectFit: 'cover', height: '15rem' }} // Adjusted height to fit your design
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.description.substring(0, 30)}</Card.Text>
                                        <Card.Text>${product.price}</Card.Text>
                                        <Button variant="primary ms-1" onClick={() => navigate(`/product/${product.slug}`)}>
                                            More Details
                                        </Button>
                                        <Button
                                            variant="secondary ms-1"
                                            onClick={() => {
                                                setCart((prevCart) => {
                                                    const updatedCart = [...prevCart, product];
                                                    localStorage.setItem('cart', JSON.stringify(updatedCart));
                                                    return updatedCart;
                                                });
                                                toast.success("Item Added to Cart");
                                            }}
                                        >
                                            ADD TO CART
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Search;
