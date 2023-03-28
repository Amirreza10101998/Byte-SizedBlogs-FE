import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/post/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const token = Cookies.get('token');
    const user = token ? jwt_decode(token) : null;

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col lg={8} md={10} sm={12}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 className="mb-3">{post.title}</h1>
                        <p className="text-muted mb-3">{`By ${post.author.firstName} ${post.author.lastName} on ${new Date(post.createdAt).toLocaleDateString()}`}</p>
                        {user && user._id === post.author._id && (
                            <Link to={`/post/${id}/edit`}>
                                <Button className="mb-3">Edit Post</Button>
                            </Link>
                        )}
                    </div>
                    <Image src={post.image} fluid rounded className="mb-3" />
                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </Col>
            </Row>
        </Container>
    );
};

export default PostPage;
