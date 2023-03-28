import { Route, Routes } from "react-router-dom"
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { AuthProvider } from './AuthContext.js';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/post/:id/edit" element={<EditPost />} />
                    <Route path="post/:id" element={<PostPage />} />
                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;
