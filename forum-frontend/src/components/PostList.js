import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts/').then(response => {
            setPosts(response.data);
        });
    }, []);

    return (
        <div className="container">
            <h1>Forum Posts</h1>
            {posts.map(post => (
                <div className="card my-3" key={post.id}>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <small className="text-muted">By {post.author_name}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
