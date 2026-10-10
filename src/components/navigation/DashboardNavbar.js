import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/navbar.css";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <Navbar className="dashboard-navbar" expand="lg" dark>
      <NavbarBrand href="/dashboard" className="navbar-brand-custom">
        RBAC Module
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <Dropdown
            nav
            inNavbar
            isOpen={profileDropdown}
            toggle={toggleProfileDropdown}
          >
            <DropdownToggle nav className="profile-toggle">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {user?.profile_image_url ? (
                  <Avatar src={user.profile_image_url} size={32} />
                ) : (
                  <Avatar icon={<UserOutlined />} size={32} />
                )}
                <span>{user?.username || "User"} ▼</span>
              </div>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem disabled>
                <span className="text-muted small">{user?.email}</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default DashboardNavbar;
