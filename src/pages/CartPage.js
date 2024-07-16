import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';

function CartPage() {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price * item.quantity;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
        } catch (error) {
            console.log(error);
            return "$0.00";
        }
    }

    // Remove item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    // Get Braintree client token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Handle payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('dashboard/user/orders');
            toast.success('Payment successful');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Render cart items
    const renderCartItems = () => {
        const groupedCart = {};
        cart.forEach((item) => {
            if (!groupedCart[item._id]) {
                groupedCart[item._id] = { ...item, quantity: 1 };
            } else {
                groupedCart[item._id].quantity++;
            }
        });

        return Object.values(groupedCart).map((item) => (
            <div className='row m-2 flex-row' key={item._id}>
                <div className='col-md-4'>
                    <Card.Img variant="top" src={`${process.env.REACT_APP_API}/api/product/product-photo/${item._id}`} />
                </div>
                <div className='col-md-8'>
                    <h4>{item.name}</h4>
                    <p>{item.description.substring(0, 30)}....</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <Button variant="danger" onClick={() => removeCartItem(item._id)}>
                        REMOVE
                    </Button>
                </div>
            </div>
        ));
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {auth?.token ?
                                (cart.length > 0 ? `You have ${cart.length} items in your cart.` : "Your Cart is empty") :
                                "Please login to checkout"
                            }
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {renderCartItems()}
                    </div>
                    <div className='col-md-4 text-center'>
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <Button variant="outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
                                        UPDATE ADDRESS
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className='mb-3'>
                                {
                                    auth?.token ? (
                                        <Button variant="outline-warning" onClick={() => navigate('/dashboard/user/profile')}>Update Address</Button>
                                    ) : (
                                        <Button variant="outline-warning" onClick={() => navigate('/login', { state: "/cart", })}>Please login</Button>

                                    )
                                }
                            </div>
                        )}
                        <div className='mt-2'>
                            {
                                !clientToken || !cart?.length ? ("") :
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault'
                                            }
                                        }}
                                        onInstance={instance => setInstance(instance)}
                                    />
                            }
                            <Button variant="primary" onClick={handlePayment}
                                disabled={!loading || !instance || !auth?.user?.address}>
                                {loading ? "Processing" : "Make Payment"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage;
