import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditReply.css';

const EditReply = () => {
    Axios.defaults.withCredentials = true;
    const { commentId } = useParams();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        // Redirect to login if not logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });

        Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/comment/${commentId}`)
            .then(response => {
                if (response.data) {
                    setCommentContent(response.data.Content);
                }
            })
            .catch(error => console.error('Error fetching comment:', error));
    }, [commentId]);

    const handleEditComment = (e) => {
        e.preventDefault();
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/editComment/${commentId}`, {
            newContent: commentContent
        }).then(response => {
            console.log('Comment updated successfully');
            navigate(-1); // Navigate back to the previous page
        }).catch(error => {
            console.error('Error updating comment:', error);
        });
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="edit-reply-container">
            <button onClick={handleBack} className="back-button">Back</button>
            <h1>Edit Reply</h1>
            <form onSubmit={handleEditComment}>
                <textarea 
                    value={commentContent} 
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Your reply"
                />
                <button type="submit">Confirm Edit</button>
            </form>
        </div>
    );
};

export default EditReply;
