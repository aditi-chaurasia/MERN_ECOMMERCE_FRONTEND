import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import Card from 'react-bootstrap/Card';


function Order() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/orders`, {
          headers: {
            Authorization: `Bearer ${auth.token}` // Ensure authorization header is set correctly
          }
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong while fetching orders');
      }
    };

    if (auth.token) {
      getOrders();
    }
  }, [auth.token]);

  return (
    <Layout title="Orders - TrendyCart">
      <Container fluid>
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <h1>Orders</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Buyer</th>
                  <th>Order Details</th>
                  <th>Payment</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.status}</td>
                    <td>{order.buyerName}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className='container'>
            {
                            orders?.products?.map(p => (
                                <div className='row m-2 flex-row' key={p._id}>
                                    <div className='col-md-4'>
                                        <Card.Img variant="top" src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`} />
                                    </div>
                                    <div className='col-md-8'>
                                        <h4>{p.name}</h4>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: ${p.price}</p>
                                    </div>
                                </div>
                            ))
                        }

            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Order;
