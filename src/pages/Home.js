import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Home = () => {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrderStartDate, setSortOrderStartDate] = useState('asc');
    const [sortOrderEndDate, setSortOrderEndDate] = useState('asc');

    useEffect(() => {
        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/login').then((response) => {
            if (response.status !== 200) {
                navigate('/');
            }
        });

        Axios.get('https://mysql-capstone-509eaa3bcdeb.herokuapp.com/mytasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, [navigate]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSortByStartDate = () => {
        const sortedTasks = [...tasks].sort((a, b) => sortOrderStartDate === 'asc' ? new Date(a.StartDate) - new Date(b.StartDate) : new Date(b.StartDate) - new Date(a.StartDate));
        setTasks(sortedTasks);
        setSortOrderStartDate(sortOrderStartDate === 'asc' ? 'desc' : 'asc');
    };

    const handleSortByEndDate = () => {
        const sortedTasks = [...tasks].sort((a, b) => sortOrderEndDate === 'asc' ? new Date(a.EndDate) - new Date(b.EndDate) : new Date(b.EndDate) - new Date(a.EndDate));
        setTasks(sortedTasks);
        setSortOrderEndDate(sortOrderEndDate === 'asc' ? 'desc' : 'asc');
    };

    let filteredTasks = null;

    if (tasks && Array.isArray(tasks) && tasks.length > 0) {
        filteredTasks = tasks.filter(task =>
            task.TaskName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        filteredTasks = [];
    }

    return (
        <div className="home-page">
            <div className="tasks-section">
                <h2>My Tasks</h2>
                <div className="search-and-sort-bar">
                    <input
                        type="text"
                        placeholder="Search task names"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSortByStartDate}>Sort by Start Date</button>
                    <button onClick={handleSortByEndDate}>Sort by End Date</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.TaskID}>
                                <td>{task.TaskName}</td>
                                <td>{task.Description}</td>
                                <td>{formatDate(task.StartDate)}</td>
                                <td>{formatDate(task.EndDate)}</td>
                                <td>{task.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="calendar-section">
                <h2>Calendar</h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={filteredTasks.map(task => ({
                        title: task.TaskName,
                        start: task.StartDate,
                        end: task.EndDate
                    }))}
                />
            </div>
        </div>
    );
};

export default Home;
