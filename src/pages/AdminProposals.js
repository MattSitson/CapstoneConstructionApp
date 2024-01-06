import React, { useState, useEffect } from 'react';
import './AdminProposals.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminProposals() {
    Axios.defaults.withCredentials = true;
    const [proposals, setProposals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });

        //Retrieve all proposals
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/adminProposals')
            .then(response => {
                setProposals(response.data);
            })
            .catch(error => {
                console.error('Error fetching proposals:', error);
            });
    }, []);

    //Send an Axios request to update the Status to Approved
    const handleApprove = (proposalId) => {
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/updateProposalStatus/${proposalId}`, { status: 'Approved' })
            .then(() => {
                setProposals(proposals.map(proposal => 
                    proposal.ProposalID === proposalId ? { ...proposal, Status: 'Approved' } : proposal
                ));
            })
            .catch(error => {
                console.error('Error updating proposal status:', error);
            });
    };

    //Send an Axios request to update the Status to Denied
    const handleDeny = (proposalId) => {
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/updateProposalStatus/${proposalId}`, { status: 'Denied' })
            .then(() => {
                setProposals(proposals.map(proposal => 
                    proposal.ProposalID === proposalId ? { ...proposal, Status: 'Denied' } : proposal
                ));
            })
            .catch(error => {
                console.error('Error updating proposal status:', error);
            });
    };

    // Filter for search filter. Currently filters by Title
    const filteredProposals = proposals.filter(proposal =>
        proposal.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='admin-proposals-container'>
            <h1>Admin Proposals</h1>
            <input
                type="text"
                placeholder="Search proposal titles"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProposals.map((proposal) => (
                        <tr key={proposal.ProposalID}>
                            <td>{proposal.Title}</td>
                            <td>{proposal.Content}</td>
                            <td>{proposal.AuthorFirstName} {proposal.AuthorLastName}</td>
                            <td>{proposal.Status}</td>
                            <td>
                                {proposal.Status !== 'Approved' && (
                                    <>
                                        <button onClick={() => handleApprove(proposal.ProposalID)} className="approve-button">Approve</button>
                                        <button onClick={() => handleDeny(proposal.ProposalID)} className="deny-button">Deny</button>
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

export default AdminProposals;
