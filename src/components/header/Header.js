import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Nav,
  Navbar,
  NavItem,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Collapse,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';


const Header = React.memo(
  function Header({ className, ...props }) {

    const [isOpen, setIsOpen] = useState(false);
    const { user, setUserAuth, setAuthenticated } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [isScroll, setScroll] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", () =>
          setScroll(window.pageYOffset > 60)
        );
      }
    }, []);

    const toggle = () => setIsOpen(!isOpen);
    const handleLogout = (e) => {
      e.preventDefault();
      setUserAuth({});
      setAuthenticated(false);
      localStorage.removeItem('user-data');
      localStorage.removeItem('authenticated');
      navigate('/login');
      window.location.reload(false);
    }
    
    return (
      <header
        className={clsx(
          "mw-header sticky-top",
          isScroll ? "scrolled" : "",
          className
        )}
        {...props}
      >
        <Navbar expand="lg" container="sm">
          <Link className="navbar-brand" to="/">
            CFpages
          </Link>
          <NavbarToggler onClick={toggle} className="navbar-icon">
            <div className="menu-toggle">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </NavbarToggler>
          <Collapse navbar isOpen={isOpen}>
            <Nav navbar className="ms-auto mw-navbar">
              <NavItem>
                <NavLink
                  className={clsx(
                    ({ isActive }) => isActive ? "active" : "",
                    "nav-link")
                  }
                  to="/"
                >
                  Browse
                </NavLink>
              </NavItem>

              {!Object.keys(user).length ? (
                <NavItem className="ms-lg-2">
                  <NavLink className="navbar-user nav-link" to="/login">
                    <div className="nav-content">
                      <Avatar />
                      <div className="nav-text">Accounts</div>
                    </div>
                  </NavLink>
                </NavItem>
              ) : (
                <UncontrolledDropdown inNavbar nav className="ms-lg-2">
                  <DropdownToggle nav className="navbar-user">
                    <div className="nav-content">
                      <Avatar name={user.username}/>
                      <div className="nav-text">{user.username}</div>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <NavLink
                      className={clsx(
                        ({ isActive }) => isActive ? "active" : "",
                        "dropdown-item")
                      }
                      to="/posts"
                    >
                      Create post
                    </NavLink>
                    <NavLink
                      className={clsx(
                        ({ isActive }) => isActive ? "active" : "",
                        "dropdown-item")
                      }
                      to={`/${user.username}`}
                    >
                      Profile
                    </NavLink>
                    <div className="separated-content">
                      <div role="button" className="dropdown-item" to="#" onClick={handleLogout}>
                        Logout
                      </div>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    )
  }
)

export default Header;