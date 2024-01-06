import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import CreateUser from './pages/CreateNewUser';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateTask from './pages/CreateNewTask';
import Tasks from './pages/Tasks';
import EditTask from './pages/EditTask'; 
import MainDiscussion from './pages/MainDiscussion';
import CreatePost from './pages/CreatePost';
import DiscussionPost from './pages/DiscussionPost';
import CreateReply from './pages/CreateReply';
import EditPost from './pages/EditPost';
import EditReply from './pages/EditReply';
import Announcements from './pages/Announcements';
import CreateAnnouncement from './pages/CreateAnnouncement';
import EditAnnouncement from './pages/EditAnnouncements';
import ManageUsers from './pages/ManageUsers';
import EditUser from './pages/EditUser';
import EmployeeProposals from './pages/EmployeeProposals';
import CreateProposal from './pages/CreateProposal';
import EditProposal from './pages/EditProposal';
import AdminProposals from './pages/AdminProposals';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <RoutesWithNavbar />
    </Router>
  );
}

const RoutesWithNavbar = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return (
    <>
      {showNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/editUser/:userId" element={<EditUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/editTask/:taskId" element={<EditTask />} /> 
        <Route path="/discussion" element={<MainDiscussion />} />
        <Route path="/discussionPost/:postId" element={<DiscussionPost />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/addComment/:postId" element={<CreateReply />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/editComment/:commentId" element={<EditReply />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/createAnnouncement" element={<CreateAnnouncement />} />
        <Route path="/editAnnouncement/:announcementId" element={<EditAnnouncement />} />
        <Route path="/employeeProposals" element={<EmployeeProposals />} />
        <Route path="/createProposal" element={<CreateProposal />} />
        <Route path="/editProposal/:proposalId" element={<EditProposal />} />
        <Route path="/adminProposals" element={<AdminProposals />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </>
  );
}

export default App;
