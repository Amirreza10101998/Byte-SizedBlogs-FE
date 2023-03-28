import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/CreatePost.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.log('Authorization header not found');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const formData = new FormData();
            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('content', content);
            formData.append('image', image);

            const response = await axios.post("http://localhost:4500/post", formData, config);
            const data = response.data;
            console.log(response);
            if (response.status === 200) {
                setRedirect(true)
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (redirect) {
        return <Navigate to={"/"} />
    }


    return (
        <Container className="create-post-container">
            <Row>
                <Col>
                    <Card className="create-post-card">
                        <Card.Header>
                            <h2 className="text-center">Create a New Post</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="summary">
                                    <Form.Label>Post Summary</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="content">
                                    <Form.Label>Content</Form.Label>
                                    <ReactQuill
                                        value={content}
                                        onChange={(content) => setContent(content)}
                                        theme="snow"
                                        modules={{
                                            toolbar: [
                                                [{ header: [1, 2, false] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                                                ['link', 'image'],
                                                ['clean'],
                                            ],
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="image">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/*"
                                    />
                                </Form.Group>
                                <Button className="submit-btn" variant="primary" type="submit">
                                    Publish
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreatePost;
