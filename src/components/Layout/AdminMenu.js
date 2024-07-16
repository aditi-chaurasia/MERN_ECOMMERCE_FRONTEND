import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
  return (
    <>
      <h2>Admin Panel</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <NavLink to="/dashboard/admin/create-category" className="nav-link">
            Create Category
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/dashboard/admin/create-product" className="nav-link">
            Create Product
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/dashboard/admin/user" className="nav-link" activeClassName="active">
            Users
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/dashboard/admin/products" className="nav-link" activeClassName="active">
            Product
          </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default AdminMenu;
