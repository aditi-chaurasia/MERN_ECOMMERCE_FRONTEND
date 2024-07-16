import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import CategoryForm from '../../components/Form/CategoryForm';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../context/auth';
import { Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/category/create-category`,
        { name },
        {
          headers: {
            Auth: auth.token, // Include the token in the request headers
          }
        }
      );
      if (data?.success) {
        toast.success(`${data.category.name} category is created`);
        getAllCategory();
        setName(''); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllCategory = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-category`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          }
        }
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`,
        { name: updatedName }, 
        {
          headers: {
            Auth: auth.token, 
          }
        }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //handle delete
  const handleDelete = async (pId) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/category/delete-category/${pId}`,
        {
          headers: {
            Auth: auth.token, 
          }
        }
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminMenu />
        </Col>
        <Col md={9}>
          <h1>Manage Category</h1>
          <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className='w-75'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <Button variant="primary" onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}>Edit</Button>
                      <Button variant="danger" className='ms-2'onClick={() => {
                              handleDelete(c._id);
                            }} >Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </Col>
      </Row>
    </Layout>
  );
}

export default CreateCategory;
