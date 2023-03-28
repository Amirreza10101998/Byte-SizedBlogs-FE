import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/post/${id}`);
                setPost(response.data);
                setFormData({
                    title: response.data.title,
                    summary: response.data.summary,
                    content: response.data.content,
                });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        try {
            await axios.put(`http://localhost:4500/post/${id}`, formData, config);
            navigate(`/post/${id}`);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Edit Post</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='p-3' controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='p-3' controlId="summary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                as="textarea"

                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='p-3' controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                            <div className='pt-3'>
                                <Button type="submit">Update Post</Button>
                            </div>
                        </Form.Group>


                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditPost;
