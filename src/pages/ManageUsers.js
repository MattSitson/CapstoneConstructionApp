import React, { useState, useEffect } from 'react';
import './ManageUsers.css'; // Ensure this import matches the name of your CSS file
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const ManageUsers = () => {
    Axios.defaults.withCredentials = true;
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });

        fetchUsers();
    }, []);

    const fetchUsers = (search = '') => {
        Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/usersAll?search=${search}`)
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };

    

    const handleDelete = (userId) => {
        Axios.delete(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user.UserID !== userId));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleEdit = (userId) => {
        navigate(`/editUser/${userId}`);
    };

    const filteredUsers = users.filter(user =>
        user.Username && user.Username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Users</h1>
            <div className="manage-users-search-create-bar">
                <input
                    className="manage-users-search-input"
                    type="text"
                    placeholder="Search usernames"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <button className="manage-users-button" onClick={() => navigate('/createUser')}>Create New User</button>
            </div>
            <table className="manage-users-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.UserID}>
                            <td>{user.UserID}</td>
                            <td>{user.Username}</td>
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{user.Role}</td>
                            <td className="manage-users-table-action-buttons">
                                <button className="manage-users-edit" onClick={() => handleEdit(user.UserID)}>Edit</button>
                                <button className="manage-users-delete" onClick={() => handleDelete(user.UserID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
