import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"

const BlogPost = ({ id, image, title, author, date, content }) => {
    return (
        <Container style={{ borderTop: "1px solid black", marginTop: "50px", paddingBottom: "40px", paddingTop: "40px" }}>
            <Row className="align-items-center">
                <Col lg={6} md={12} sm={12} xs={12}>
                    <Link to={`/post/${id}`}>
                        <img style={{ width: "90%", maxHeight: "400px", objectFit: "cover", borderRadius: "5px" }} src={image} alt={title} className="blog-post-image" />
                    </Link>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}>
                    <div style={{ paddingLeft: "20px" }}>
                        <Link to={`/post/${id}`}>
                            <h2 className="blog-post-title" style={{ fontSize: "36px", fontWeight: "700", marginBottom: "15px" }}>{title}</h2>
                        </Link>
                        <p className="blog-post-author" style={{ fontSize: "14px", color: "#888", marginBottom: "5px" }}>By {author}</p>
                        <p className="blog-post-date" style={{ fontSize: "12px", color: "#aaa", marginBottom: "25px" }}>Posted on {date}</p>
                        <p className="blog-post-content" style={{ fontSize: "18px", fontWeight: "400", lineHeight: "1.5", textAlign: "justify" }}>{content}</p>
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

export default BlogPost;
