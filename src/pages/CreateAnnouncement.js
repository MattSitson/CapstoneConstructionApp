import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateAnnouncement.css';

const CreateAnnouncement = () => {
    Axios.defaults.withCredentials = true;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleCreateAnnouncement = (e) => {
        e.preventDefault();
        Axios.post('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/createAnnouncement', {
            title,
            content
        }).then(response => {
            console.log('Announcement created successfully');
            navigate('/announcements');
        }).catch(error => {
            console.error('Error creating announcement:', error);
        });
    };

    const handleBack = () => {
        navigate('/announcements');
    };

    return (
        <div className="create-announcement-container">
            <div className="header-with-back-button">
                <button onClick={handleBack} className="back-button">Back to Announcements</button>
                <h1>Create Announcement</h1>
            </div>
            <form onSubmit={handleCreateAnnouncement}>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title"
                />
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit" className="create-button">Create Announcement</button>
            </form>
        </div>
    );
};

export default CreateAnnouncement;
