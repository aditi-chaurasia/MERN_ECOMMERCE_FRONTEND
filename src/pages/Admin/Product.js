import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [auth] = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Adjusting to have 3 cards per row, 3 rows per page

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`, // Include the token in the request headers
                },
            });
            setProducts(data.products);
        } catch (error) {
            console.error(error); // Log the error to debug
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Layout title={"Dashboard - Get Product"}>
            <div className="flex">
                <div className="w-1/4">
                    <AdminMenu />
                </div>
                <div className="w-3/4 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedProducts?.map((p) => (
                            <div key={p._id} className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col">
                                <Link to={`/dashboard/admin/product/${p.slug}`}>
                                    <img 
                                        className="w-full h-48 object-cover" 
                                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`} 
                                        alt={p.name}
                                    />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                                        <p className="text-gray-700 mb-4 flex-grow">{p.description.substring(0, 30)}....</p>
                                        <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            VIEW PRODUCT
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center bg-white py-10 dark:bg-dark w-full">
                        <ul className="flex items-center justify-center gap-1">
                            <li>
                                <button
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
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
                            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-dark ${currentPage === index + 1 ? 'shadow-sm dark:bg-white/5' : 'hover:bg-gray-2 dark:hover:bg-white/5'}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
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
                </div>
            </div>
        </Layout>
    );
};

export default Product;
