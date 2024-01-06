import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Statistics.css'; 
import { useNavigate } from 'react-router-dom';

function Statistics() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalProposals, setTotalProposals] = useState(0);
    const [proposalsStatus, setProposalsStatus] = useState({});

    useEffect(() => {
        // Redirect to login if not logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });

        // Fetch total users
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/stats/totalUsers')
            .then(response => setTotalUsers(response.data.totalUsers))
            .catch(error => console.error('Error fetching total users:', error));

        // Fetch total tasks
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/stats/totalTasks')
            .then(response => setTotalTasks(response.data.totalTasks))
            .catch(error => console.error('Error fetching total tasks:', error));

        // Fetch completed tasks
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/stats/completedTasks')
            .then(response => setCompletedTasks(response.data.completedTasks))
            .catch(error => console.error('Error fetching completed tasks:', error));

        // Fetch total proposals
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/stats/totalProposals')
            .then(response => setTotalProposals(response.data.totalProposals))
            .catch(error => console.error('Error fetching total proposals:', error));

        // Fetch proposals by status
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/stats/proposalsByStatus')
            .then(response => {
                const statusCounts = response.data.reduce((acc, curr) => ({ ...acc, [curr.Status]: curr.count }), {});
                setProposalsStatus(statusCounts);
            })
            .catch(error => console.error('Error fetching proposals by status:', error));
    }, []);

    return (
        <div className='statistics-container'>
            <h1>Statistics</h1>
            <p>Total Users: <span>{totalUsers}</span></p>
            <p>Total Tasks: <span>{totalTasks}</span></p>
            <p>Completed Tasks: <span>{completedTasks}</span></p>
            <p>Total Proposals: <span>{totalProposals}</span></p>
            <p>Proposals Pending: <span>{proposalsStatus['Pending'] || 0}</span></p>
            <p>Proposals Approved: <span>{proposalsStatus['Approved'] || 0}</span></p>
            <p>Proposals Denied: <span>{proposalsStatus['Denied'] || 0}</span></p>
        </div>
    );
}

export default Statistics;
