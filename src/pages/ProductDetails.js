import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  {/* Move the Add to Cart button here */}
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.name}
              </h2>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ${product.price}
                  </span>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Category:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.category?.name}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {product.description}
                </p>
              </div>
              {/* Add to Cart button moved here */}
              <button
                className="text-right border border-gray-900 px-3 py-1 rounded"
                onClick={() => {
                  setCart((prevCart) => {
                    const updatedCart = [...prevCart, product];
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    return updatedCart;
                  });
                  toast.success("Item Added to Cart");
                }}
              >
                <span className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Add to cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      <div className="container mt-4">
        <h1>Related Products</h1>

        {relatedProducts.length === 0 && (
          <p className="text-center">No Similar Products Found</p>
        )}
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="col-md-3 mb-4">
              <div className="card h-full overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${relatedProduct._id}`}
                  className="card-img-top object-cover w-full h-48"
                  alt="Product"
                />
                <div className="card-body flex flex-col">
                  <h5 className="card-title">{relatedProduct.name}</h5>
                  <p className="card-text">
                    {relatedProduct.description.substring(0, 30)}
                  </p>
                  <p className="card-text">${relatedProduct.price}</p>
                  <div className="mt-auto flex items-start justify-between space-x-4">
                    <button
                      className="border border-gray-900 px-3 py-1 rounded"
                      onClick={() => {
                        setCart((prevCart) => {
                          const updatedCart = [...prevCart, relatedProduct];
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                          return updatedCart;
                        });
                        toast.success("Item Added to Cart");
                      }}
                    >
                      <span className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        Add to cart
                      </span>
                    </button>
                    <button
                      className="text-xs font-bold text-gray-900 sm:text-sm md:text-base border border-gray-900 px-3 py-1 rounded"
                      onClick={() => navigate(`/product/${relatedProduct.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
