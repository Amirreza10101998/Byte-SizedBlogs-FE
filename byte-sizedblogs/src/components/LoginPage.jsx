import React, { useState } from 'react';
import { Navigate } from "react-router-dom"
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from "../styles/LoginPage.css"
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../AuthContext.js';

const LoginPage = () => {
    const { setLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4500/login',
                {
                    email: email,
                    password: password
                });
            const data = response.data;
            console.log(data);

            if (response.status === 200) {
                const token = data.token;
                Cookies.set('token', token, { expires: 7 });
                setRedirect(true)
                setLoggedIn(true);
            }
            else {
                console.error(response.data);
                alert("login failed");
            }
        } catch (error) {
            console.error(error);
        }
    };


    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <Container fluid className={styles.loginContainer} style={{ marginTop: "20vh" }}>
            <Row className='justify-content-center align-items-center'>
                <Col xs={12} sm={10} md={8} lg={6} xl={4} >
                    <Card className={styles.loginCard}>
                        <Card.Header className={styles.cardHeader}>
                            <h2 className="text-center">Login</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='p-3' controlId="email">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='p-3' controlId="password">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <div className='pt-3'>
                                        <Button variant="primary" type="submit" block>
                                            Login
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;