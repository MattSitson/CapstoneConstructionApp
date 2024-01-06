import React, { useState, useEffect } from 'react';
import './createUser.css'; // Reusing the same CSS from CreateNewUser
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const navigate = useNavigate();
    const { userId } = useParams();
    Axios.defaults.withCredentials = true;

    // State hooks for user data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('employee');

    useEffect(() => {
        // Check if user is logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });

        // Fetch user data
        Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/users/${userId}`).then((response) => {
            const user = response.data;
            setUsername(user.Username);
            setPassword(user.Password);
            setFirstName(user.FirstName);
            setLastName(user.LastName);
            setRole(user.Role);
        }).catch((error) => {
            console.error('Error fetching user data:', error);
        });
    }, [userId, navigate]);

    const handleEditUser = () => {
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/users/${userId}`, {
            Username: username,
            Password: password,
            FirstName: firstName,
            LastName: lastName,
            Role: role
        }).then(() => {
            navigate('/manageUsers');
        }).catch((error) => {
            console.error('Error updating user:', error);
        });
    };

    return (
        <div className='form'>
            <button className='back-button-edit-users' onClick={() => navigate('/manageUsers')}>Back</button>
            <h1>Edit User Account</h1>
            
            <label>Username: </label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password: </label>
            <input
                type="password" // Changed to type 'password' for privacy
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label>First Name: </label>
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            
            <label>Last Name: </label>
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            
            <label>Role: </label>
            <select 
                name="role" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
            </select>

            <button onClick={handleEditUser}>Confirm Edit</button>
        </div>
    );
}

export default EditUser;
