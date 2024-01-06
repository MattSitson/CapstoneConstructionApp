import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditAnnouncements.css';

const EditAnnouncements = () => {
    Axios.defaults.withCredentials = true;
    const { announcementId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (!response.data.loggedIn) {
                navigate('/');
            }
        });

        //Retrieves a specific announcement
        Axios.get(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/announcement/${announcementId}`)
            .then(response => {
                setTitle(response.data.Title);
                setContent(response.data.Content);
            })
            .catch(error => console.error('Error fetching announcement:', error));
    }, [announcementId]);

    const handleEdit = (e) => {
        e.preventDefault();
        Axios.put(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/editAnnouncement/${announcementId}`, { title, content })
            .then(() => navigate('/announcements'))
            .catch(error => console.error('Error updating announcement:', error));
    };

    return (
        <div className="edit-announcement-container">
            <button onClick={() => navigate('/announcements')} className="back-button">Back</button>
            <h1>Edit Announcement</h1>
            <form onSubmit={handleEdit}>
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditAnnouncements;
