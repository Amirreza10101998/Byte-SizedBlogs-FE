import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from "axios"
import styles from "../styles/LoginPage.css"
import { Navigate } from 'react-router-dom';


const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4500/register',
                {
                    firstName,
                    lastName,
                    email,
                    password,
                });
            const data = response.data;
            console.log(data);

            if (response.status === 201) {
                setRedirect(true)
            }

        } catch (error) {
            console.error(error);
        }
    };


    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <Container fluid className={styles.registerContainer} style={{ marginTop: "30px" }}>
            <Row className='justify-content-center align-items-center'>
                <Col xs={12} sm={10} md={8} lg={6} xl={4} >
                    <Card className={styles.registerCard}>
                        <Card.Header className={styles.cardHeader}>
                            <h2 className="text-center">Register</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='p-3' controlId="firstName">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='p-3' controlId="lastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
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
                                </Form.Group>
                                <Form.Group className='p-3' controlId="confirmPassword">
                                    <Form.Label>Confirm Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <div className='pt-3'>
                                        <Button variant="primary" type="submit" block>
                                            Register
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

export default RegisterPage;