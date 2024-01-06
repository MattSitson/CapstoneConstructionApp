import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; 

const CreatePost = () => {
    Axios.defaults.withCredentials = true;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response)=> {
        if(response.data.loggedIn === false){
            navigate('/');
        }
        });

        Axios.post('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/createDiscussionPost', { title, content })
            .then(() => {
                // Clear the form and navigate to the discussion page
                setTitle('');
                setContent('');
                navigate('/discussion');
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    };

    return (
        <div className="create-post-container">
            <button onClick={() => navigate('/discussion')} className="back-button">Back to Discussion Forum</button>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit} className="post-form">
                <label>
                    Title
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
                </label>
                <label>
                    Content
                    <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>
                </label>
                <button type="submit" className="submit-button">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
