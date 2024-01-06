import React, { useState, useEffect } from 'react';
import './EmployeeProposals.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function EmployeeProposals() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [proposals, setProposals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login')
            .then((response) => {
                if (response.data.loggedIn) {
                    const userId = response.data.user[0].UserID;
                    Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/proposals/${userId}`)
                        .then((res) => {
                            setProposals(res.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching proposals:', error);
                        });
                } else {
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error('Error checking login status:', error);
            });
    }, [navigate]);

    const handleEdit = (proposalId) => {
        navigate(`/editProposal/${proposalId}`);
    };

    const handleDelete = (proposalId) => {
        Axios.delete(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/deleteProposal/${proposalId}`)
            .then(() => {
                console.log('Proposal deleted successfully');
                setProposals(proposals.filter(proposal => proposal.ProposalID !== proposalId));
            })
            .catch(error => {
                console.error('Error deleting proposal:', error);
            });
    };

    const filteredProposals = proposals.filter(proposal =>
        proposal.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='employee-proposals-container'>
            <h1>Your Proposals</h1>
            <div className="search-and-create-bar">
                <input
                    type="text"
                    placeholder="Search proposal titles"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='create-button' onClick={() => navigate('/createProposal')}>Create New Proposal</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProposals.map((proposal) => (
                        <tr key={proposal.ProposalID}>
                            <td>{proposal.Title}</td>
                            <td>{proposal.Content}</td>
                            <td>{proposal.Status}</td>
                            <td>
                                {proposal.Status !== 'Approved' && (
                                    <>
                                        <button onClick={() => handleEdit(proposal.ProposalID)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDelete(proposal.ProposalID)} className="delete-button">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeProposals;
