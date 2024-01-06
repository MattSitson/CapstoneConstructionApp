import React, { useState, useEffect } from 'react';
import './CreateProposal.css'; // Reusing the CSS from CreateProposal
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

function EditProposal() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const { proposalId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/proposals/edit/${proposalId}`)
            .then(response => {
                const proposalData = response.data;
                setTitle(proposalData.Title);
                setContent(proposalData.Content);
            })
            .catch(error => console.error('Error fetching proposal:', error));
    }, [proposalId]);

    const handleSubmit = () => {
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/proposals/edit/${proposalId}`, {
            Title: title,
            Content: content,
            Status: 'Pending'
        })
        .then(() => {
            navigate('/employeeProposals');
        })
        .catch(error => console.error('Error updating proposal:', error));
    };

    return (
        <div className='create-proposal-container'>
            <div className="top-controls">
                <button className='back-button-proposals' onClick={() => navigate('/employeeProposals')}>Back</button>
            </div>
            <h1>Edit Proposal</h1>
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

export default EditProposal;
