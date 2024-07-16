import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <Card>
              <Card.Body>
                <Card.Title>Admin Details</Card.Title>
                <Card.Text>
                  <p><strong>Name:</strong> {auth?.user?.name}</p>
                  <p><strong>Email:</strong> {auth?.user?.email}</p>
                  <p><strong>Contact:</strong> {auth?.user?.phone}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default AdminDashboard;
