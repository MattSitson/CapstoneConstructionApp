import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Announcements.css';

const Announcements = () => {
    Axios.defaults.withCredentials = true;
    const [announcements, setAnnouncements] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //Check if user is logged in
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then(response => {
            if (response.data.loggedIn) {
                setCurrentUser(response.data.user[0]);
            } else {
                navigate('/');
            }
        });

        // Get all announcements
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/announcements')
            .then(response => {
                
                setAnnouncements(response.data);
            })
            .catch(error => console.error('Error fetching announcements:', error));
    }, [navigate]);
    
    const handleCreateAnnouncement = () => {
        navigate('/createAnnouncement');
    };

    const handleEditAnnouncement = (announcementId) => {
        navigate(`/editAnnouncement/${announcementId}`);
    };

    const handleDeleteAnnouncement = (announcementId) => {
        Axios.delete(`https://mysql-capstone-509eaa3bcdeb.herokuapp.com/deleteAnnouncement/${announcementId}`)
            .then(() => {
                setAnnouncements(announcements.filter(a => a.AnnouncementID !== announcementId));
            })
            .catch(error => console.error('Error deleting announcement:', error));
    };

    return (
        <div className="announcements-container">
            <h1>Announcements</h1>
            {currentUser?.Role === 'admin' && (
                <button onClick={handleCreateAnnouncement} className="create-announcement-button">
                    Create Announcement
                </button>
            )}
            <div className="announcement-list">
                {announcements.map(announcement => (
                    <div key={announcement.AnnouncementID} className="announcement-card">
                        <h2>{announcement.Title}</h2>
                        <p className="announcement-author">
                            Posted by {announcement.Author} on {new Date(announcement.DatePosted).toLocaleDateString()}
                        </p>
                        <p>{announcement.Content}</p>
                        {currentUser?.Role === 'admin' && (
                            <div className="announcement-card-actions">
                                <button onClick={() => handleEditAnnouncement(announcement.AnnouncementID)} className="edit-announcement-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteAnnouncement(announcement.AnnouncementID)} className="delete-announcement-button">
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
