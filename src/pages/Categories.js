import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory(); // Assuming useCategory hook returns an array of categories

  return (
    <Layout title="All Categories">
      <Container>
        <Row>
          {categories.map((c) => (
            <Col md={6} className="mt-5 mb-3" key={c._id}>
              <Card>
                <Card.Body>
                  <Link to={`/category/${c.slug}`}>
                    <Button variant="primary">{c.name}</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Categories;
