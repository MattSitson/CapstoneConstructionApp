import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
    Axios.defaults.withCredentials = true;
    const { postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (response.data.loggedIn === false) {
                navigate('/');
            }
        });

        Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/discussionPost/${postId}`)
            .then(response => {
                const postData = response.data.post;
                setTitle(postData.Title);
                setContent(postData.Content);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [postId, navigate]);

    const handleEditPost = (e) => {
        e.preventDefault();
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/editDiscussionPost/${postId}`, {
            title,
            content
        }).then(response => {
            console.log('Post updated successfully');
            navigate(`/discussionPost/${postId}`);
        }).catch(error => {
            console.error('Error updating post:', error);
        });
    };

    const handleBack = () => {
        navigate(`/discussionPost/${postId}`);
    };

    return (
        <div className="edit-post-container">
            <div className="edit-post-header">
                <h1>Edit Post</h1>
                <button onClick={handleBack} className="back-button">Back</button>
            </div>
            <form onSubmit={handleEditPost}>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title"
                />
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit">Confirm Edit</button>
            </form>
        </div>
    );
};

export default EditPost;
