import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Testimonials from '../components/Testimonials';

function HomePage() {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const getTotalProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log('Error fetching total product count:', error);
        }
    };

    const getAllProducts = async (pageNumber) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${pageNumber}`);
            setLoading(false);
            if (pageNumber === 1) {
                setProducts(data.products);
            } else {
                setProducts((prevProducts) => [...prevProducts, ...data.products]);
            }
        } catch (error) {
            setLoading(false);
            console.log('Error fetching products:', error);
        }
    };

    const filterProducts = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/product-filters`, {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log('Error filtering products:', error);
        }
    };

    const handleCategoryFilter = (value, id) => {
        let updatedChecked = [...checked];
        if (value) {
            updatedChecked.push(id);
        } else {
            updatedChecked = updatedChecked.filter((categoryId) => categoryId !== id);
        }
        setChecked(updatedChecked);
    };

    const handlePriceFilter = (e) => {
        setRadio(e.target.value);
    };

    const resetFilters = () => {
        setChecked([]);
        setRadio([]);
        getAllProducts(1);
    };

    useEffect(() => {
        getAllCategories();
        getTotalProducts();
        getAllProducts(page);
    }, [page]);

    useEffect(() => {
        if (checked.length || radio.length) {
            filterProducts();
        } else {
            getAllProducts(page);
        }
    }, [checked, radio]);

    return (
        <Layout title="All Products - Best Offers">
            <div className='row mt-3'>
                <div className='col-md-2'>
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="flex flex-col space-y-2">
                        {categories?.map((category) => (
                            <Checkbox
                                key={category._id}
                                onChange={(e) => handleCategoryFilter(e.target.checked, category._id)}
                            >
                                {category.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="flex flex-col space-y-2">
                        <Radio.Group onChange={handlePriceFilter} className="flex flex-col space-y-2">
                            {Prices?.map((priceRange) => (
                                <Radio key={priceRange._id} value={priceRange.array}>
                                    {priceRange.name}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="flex flex-col mt-4">
                        <Button variant="danger" onClick={resetFilters}>
                            RESET FILTERS
                        </Button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <section className="py-1 bg-white sm:py-3 lg:py-5">
                        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                            <div className="max-w-md mx-auto text-center">
                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our featured items</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 lg:mt-16 lg:gap-8">
                                {products?.map((product) => (
                                    <div
                                        key={product._id}
                                        className="relative group bg-white rounded-lg shadow-md p-4"
                                        style={{ height: '400px' }} // Fixed height for cards
                                    >
                                        <div className="overflow-hidden aspect-w-1 aspect-h-1 h-2/3">
                                            <img
                                                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                                                src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="flex items-start justify-between mt-4 space-x-4">
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                                    <span
                                                        onClick={() => navigate(`/product/${product.slug}`)}
                                                        title=""
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {product.name}
                                                    </span>
                                                </h3>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">${product.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start justify-between space-x-4 mt-2">
                                            <div>
                                                <button
                                                    className="text-xs font-bold text-gray-900 sm:text-sm md:text-base border border-gray-900 px-3 py-1 rounded"
                                                    onClick={() => navigate(`/product/${product.slug}`)}
                                                >
                                                    More Details
                                                </button>
                                            </div>
                                            <button
                                                className="text-right border border-gray-900 px-3 py-1 rounded"
                                                onClick={() => {
                                                    setCart((prevCart) => {
                                                        const updatedCart = [...prevCart, product];
                                                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                                                        return updatedCart;
                                                    });
                                                    toast.success("Item Added to Cart");
                                                }}
                                            >
                                                <span className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">Add to cart</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* Pagination Section Start */}
                    <div className="flex justify-center bg-white py-10 dark:bg-dark">
                        <ul className="flex items-center justify-center gap-1">
                            <li>
                                <button
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    <span>
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.325 14.825C11.175 14.825 11.025 14.775 10.925 14.65L5.27495 8.90002C5.04995 8.67502 5.04995 8.32503 5.27495 8.10002L10.925 2.35002C11.15 2.12502 11.5 2.12502 11.725 2.35002C11.95 2.57502 11.95 2.92502 11.725 3.15002L6.47495 8.50003L11.75 13.85C11.975 14.075 11.975 14.425 11.75 14.65C11.6 14.75 11.475 14.825 11.325 14.825Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                    <span className="max-sm:hidden"> Previous </span>
                                </button>
                            </li>

                            {/* Example buttons, you can adjust the number of buttons dynamically */}
                            {[1, 2, 3, 4, 5].map((pageNumber) => (
                                <li key={pageNumber}>
                                    <button
                                        className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-dark ${
                                            pageNumber === page ? 'shadow-sm hover:bg-gray-2 dark:bg-white/5 dark:text-white dark:hover:bg-white/5' : 'hover:bg-gray-2 dark:text-white dark:hover:bg-white/5'
                                        }`}
                                        onClick={() => setPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
                                    onClick={() => setPage(page + 1)}
                                    disabled={products.length === 0 || products.length < 10 || loading}
                                >
                                    <span className="max-sm:hidden"> Next </span>
                                    <span>
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.67495 14.825C5.52495 14.825 5.39995 14.775 5.27495 14.675C5.04995 14.45 5.04995 14.1 5.27495 13.875L10.525 8.50003L5.27495 3.15002C5.04995 2.92502 5.04995 2.57502 5.27495 2.35002C5.49995 2.12502 5.84995 2.12502 6.07495 2.35002L11.725 8.10002C11.95 8.32503 11.95 8.67502 11.725 8.90002L6.07495 14.65C5.97495 14.75 5.82495 14.825 5.67495 14.825Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* Pagination Section End */}
                </div>
            </div>
            <Testimonials />
        </Layout>
    );
}

export default HomePage;
