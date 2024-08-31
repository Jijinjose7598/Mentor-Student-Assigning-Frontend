import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import StudentTable from '../student/StudentTable';
import MentorTable from '../mentor/MentorTable';
import CreateStudentForm from '../student/CreateStudentForm';
import CreateMentorForm from '../mentor/CreateMentorForm';
import EditingStudentForm from '../student/EditingStudentForm';
import PreviousMentorPage from '../student/PreviousMentorsPage';
import NoMentorStudentsPage from '../student/NoMentorStudentsPage';
import EditMentorForm from '../mentor/EditMentorForm';
import MentorStudentsPage from '../mentor/MentorStudentsPage';

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students');
        const data = await response.json();
        setStudents(data.data || []);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:3000/mentors');
        const data = await response.json();
        setMentors(data.data || []);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  const handleButtonClick = () => {
    if (location.pathname.includes('/mentors')) {
      navigate('/mentors/create');
    } else {
      navigate('/students/create');
    }
  };

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleAddMentor = (newMentor) => {
    setMentors([...mentors, newMentor]);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(students.map(student => (student._id === updatedStudent._id ? updatedStudent : student)));
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3000/students/delete/${studentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      setStudents(students.filter(student => student._id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdateMentor = (updatedMentor) => {
    setMentors(mentors.map(mentor => (mentor._id === updatedMentor._id ? updatedMentor : mentor)));
  };

  const handleDeleteMentor = async (mentorId) => {
    try {
      const response = await fetch(`http://localhost:3000/mentors/delete/${mentorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete mentor');
      }
      setMentors(mentors.filter(mentor => mentor._id !== mentorId));
    } catch (error) {
      console.error('Error deleting mentor:', error);
    }
  };

  const buttonText = location.pathname.includes('/mentors') ? 'Add New Mentor' : 'Add New Student';

  return (
    <div className="main-content">
      <button className="add-btn" onClick={handleButtonClick}>{buttonText}</button>
      <div className="content-list">
        <Routes>
          <Route
            path="/students"
            element={
              <StudentTable
                students={students}
                onDeleteStudent={handleDeleteStudent}
              />
            }
          />
          <Route
            path="/mentors"
            element={
              <MentorTable
                mentors={mentors}
                onDeleteMentor={handleDeleteMentor}
              />
            }
          />
          <Route
            path="/students/create"
            element={<CreateStudentForm onAddStudent={handleAddStudent} />}
          />
          <Route
            path="/mentors/create"
            element={<CreateMentorForm onAddMentor={handleAddMentor} />}
          />
          <Route
            path="/students/edit/:studentId"
            element={<EditingStudentForm onUpdateStudent={handleUpdateStudent} />}
          />
          <Route
            path="/mentors/edit/:mentorId"
            element={<EditMentorForm onUpdateMentor={handleUpdateMentor} />}
          />
          <Route
            path="/students/:studentId/previous-mentors"
            element={<PreviousMentorPage />}
          />
          <Route
            path="/students/no-mentors"
            element={<NoMentorStudentsPage />}
          />
          <Route
            path="/mentors/:mentorId/students"
            element={<MentorStudentsPage />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
