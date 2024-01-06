import React, { useState, useEffect } from 'react';
import './CreateProposal.css'; 
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function CreateProposal() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        Axios.post('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/createProposal', {
            Title: title,
            Content: content,
        })
        .then(() => {
            navigate('/employeeProposals');
        })
        .catch(error => console.error('Error creating proposal:', error));
    };

    useEffect(() => {
        // Redirect to login if not logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });
    }, [navigate]);

    return (
        <div className='create-proposal-container'>
            <div className="top-controls">
                <button className='back-button-proposals' onClick={() => navigate('/employeeProposals')}>Back</button>
            </div>
            <h1>Create Proposal</h1>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Content:</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CreateProposal;
