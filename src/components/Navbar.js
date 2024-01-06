import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Navbar() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Fetch the user's role from the session
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login', { withCredentials: true })
            .then(response => {
                // Make sure the user is logged in and the role is available
                if (response.data.loggedIn && response.data.user[0].Role) {
                    setUserRole(response.data.user[0].Role);
                }
            })
            .catch(error => {
                console.error('Failed to fetch user role:', error);
            });
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        //Will log the user out and clear the session cookies
        Axios.post('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/logout')
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <nav>
            <ul>
                <li onClick={() => handleNavigation('/home')}>Home</li>
                {userRole === 'admin' && <li onClick={() => handleNavigation('/tasks')}>Tasks</li>}
                <li onClick={() => handleNavigation('/discussion')}>Discussion Forum</li>
                {userRole === 'employee' && <li onClick={() => handleNavigation('/employeeProposals')}>Proposals</li>}
                {userRole === 'admin' && <li onClick={() => handleNavigation('/adminProposals')}>Proposals</li>}
                <li onClick={() => handleNavigation('/announcements')}>Announcements</li>
                {userRole === 'admin' && <li onClick={() => handleNavigation('/manageUsers')}>Manage Users</li>}
                {userRole === 'admin' && <li onClick={() => handleNavigation('/stats')}>Statistics</li>}
                <li onClick={handleLogout} className="logout-button">Logout</li>
            </ul>
        </nav>
    );
}

export default Navbar;
