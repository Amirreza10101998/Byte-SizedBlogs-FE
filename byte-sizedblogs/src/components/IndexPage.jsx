import { useState, useEffect } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";
import { Container, Row } from "react-bootstrap";

const IndexPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:4500/post");
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container>
            {posts.map(({ _id, image, title, author, createdAt, summary }) => (
                <Row key={_id}>
                    <BlogPost
                        id={_id}
                        image={image}
                        title={title}
                        author={`${author.firstName} ${author.lastName}`}
                        date={createdAt}
                        content={summary}
                    />
                </Row>
            ))}
        </Container>
    );

};

export default IndexPage;
