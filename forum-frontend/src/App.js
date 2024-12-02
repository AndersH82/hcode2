import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import Profile from './components/Profile';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
