import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/auth';

function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard-Trendycart"}>
       <Container fluid>
        <Row>
          <Col md={3}>
            <UserMenu/>
          </Col>
          <Col md={9}>
            <Card>
              <Card.Body>
                <Card.Title>User Details</Card.Title>
                <Card.Text>
                  <p><strong>Name:</strong> {auth?.user?.name}</p>
                  <p><strong>Email:</strong> {auth?.user?.email}</p>
                  <p><strong>Contact:</strong> {auth?.user?.address}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Dashboard;
