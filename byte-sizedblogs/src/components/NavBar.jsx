import { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/NavBar.css';
import { useAuth } from "../AuthContext.js";

const NavBar = () => {
    const { loggedIn, setLoggedIn } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setLoggedIn(false);
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.get("http://localhost:4500/profile", config);
                if (response.status === 200) {
                    setLoggedIn(true);
                }
            } catch (error) {
                setLoggedIn(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        setLoggedIn(false);
        console.log('Token removed from cookies:', !Cookies.get('token'));
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand">Byte-SizedBlogs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        {loggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/" onClick={handleLogout} className="nav-link px-3">Sign Out</Nav.Link>
                                <Link className="px-2" to="/create">
                                    <Button className="rounded-0 custom-btn">Create a New Post</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} className="nav-link px-3" to="/login">Login</Nav.Link>
                                <Link className="px-2" to="/register">
                                    <Button className="rounded-0 custom-btn">Register</Button>
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
