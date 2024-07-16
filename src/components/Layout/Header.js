import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Searchinput from '../Form/Searchinput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [cart] = useCart(); 
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const navigate = useNavigate();

    // Navigation links
    const Links = [
        { name: "HOME", link: "/" },
        { name: "CATEGORY", link: "/category", dropdown: true },
        { name: "CART", link: "/cart" },
    ];

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('auth');
        setAuth({ ...auth, user: null, token: "" });
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    // Calculate total items in cart
    const totalItemsInCart = cart.length;

    return (
        <div className='shadow-md'>
            <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
                {/* Logo section */}
                <div className='flex items-center gap-1'>
                    <span className='font-bold text-2xl cursor-pointer'>TrendyCart</span>
                    <Searchinput/>

                    {/* Menu icon for mobile view */}
                    <div className='md:hidden mx-20'>
                        <div onClick={() => setOpen(!open)} className='w-7 h-7 cursor-pointer '>
                            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                        </div>
                    </div>
                </div>
                {/* Link items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 bg-white md:z-auto z-[-1] w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'block' : 'hidden md:block'}`}>
                    {Links.map((link) => (
                        <li key={link.name} className='md:ml-8 md:my-0 my-7 font-semibold'>
                            {link.name === 'CART' ? (
                                <Nav.Link href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>
                                    CART {totalItemsInCart > 0 && `(${totalItemsInCart})`}
                                </Nav.Link>
                            ) : link.dropdown ? (
                                <NavDropdown title={link.name} id={`nav-dropdown-${link.name}`}>
                                    <NavDropdown.Item as={Nav.Link} href="/categories">All Categories</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {categories.map((c) => (
                                        <NavDropdown.Item key={c._id} as={Nav.Link} href={`/category/${c.slug}`}>
                                            {c.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>
                                    {link.name}
                                </Nav.Link>
                            )}
                        </li>
                    ))}
                    {auth?.user ? (
                        <NavDropdown title={<span style={{ color: 'black', textTransform: 'uppercase' }}>{auth.user.name}</span>} id="basic-nav-dropdown" className='md:ml-8 md:my-0 my-7 font-semibold'>
                            <NavDropdown.Item as={Nav.Link} href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                                <Nav.Link href='/login' className='text-gray-800 hover:text-blue-400 duration-500'>LOGIN</Nav.Link>
                            </li>
                            <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                                <Nav.Link href='/register' className='text-gray-800 hover:text-blue-400 duration-500'>REGISTER</Nav.Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
