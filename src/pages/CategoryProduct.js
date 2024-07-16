import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null); 
  useEffect(() => {
    if (params?.slug) {
      getProductsByCat();
    }
  }, [params.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category); // Update category state with fetched data
    } catch (error) {
      console.error('Error fetching category and products:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h2 className='text-center'>Category - {category?.name}</h2>
        <h2 className='text-center'>{products?.length} result found</h2>
        <div className='row'>
        <div className='d-flex flex-wrap'>
             {products?.map((p) => (
                            <>
                             <div className='col-md-3 mb-4 mr-2 mx-auto'>                           
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" 
                                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`} />
                                    <Card.Body>
                                        <Card.Title>{p.name}</Card.Title>
                                        <Card.Text>{p.description.substring(0,30)}....</Card.Text>
                                        <Card.Text>${p.price}</Card.Text>
                                        <Button variant="primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>MORE DETAILS</Button>
                                        <Button variant="secondary ms-1">ADD TO CART</Button>
                                    </Card.Body>
                                </Card>
                               </div>
                            </>
                        ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
