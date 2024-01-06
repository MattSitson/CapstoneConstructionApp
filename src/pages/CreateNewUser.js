import React, { useState, useEffect } from 'react';
import './createUser.css'; 
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateNewUser() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    // State hooks for form inputs
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('employee');

    useEffect(() => {
        // Redirect to login if not logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });
    }, [navigate]);

    // Function to create new user
    const create = () => {
        Axios.post('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/createNewUser', {
            Username: username,
            Password: password,
            FirstName: firstName,
            LastName: lastName,
            Role: role
        }).then(() => {
            navigate('/manageUsers'); // Redirect to the manage users page after creation
        }).catch((error) => {
            console.error('Error creating new user:', error);
        });
    };

    return (
        <div className='form'>
            <button className='back-button-manage-users' onClick={() => navigate('/manageUsers')}>Back</button>
            <h1>Create User Account</h1>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />
            <label>Password:</label>
            <input
                type="password" // Use password type for security
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label>First Name:</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name:</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <label>Role:</label>
            <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={create}>Create</button>
        </div>
    );
}

export default CreateNewUser;
