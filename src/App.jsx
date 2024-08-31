import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/slidebar/SlideBar';
import MainContent from './components/maincontent/MainContent';
import CreateStudentForm from './components/student/CreateStudentForm';
import CreateMentorForm from './components/mentor/CreateMentorForm';
import './App.css';

const App = () => {
  return (
   
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/*" element={<MainContent />} />
          <Route path="/students/create" element={<CreateStudentForm />} />
          <Route path="/mentors/create" element={<CreateMentorForm />} />
        </Routes>
      </div>
    
  );
};

export default App;
