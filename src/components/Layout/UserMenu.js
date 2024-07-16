import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function UserMenu() {
  return (
    <>
      <h2>User Panel</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <NavLink to="/dashboard/user/profile" className="nav-link">
                 Profile   
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/dashboard/user/orders" className="nav-link">
            Orders
          </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default UserMenu;
