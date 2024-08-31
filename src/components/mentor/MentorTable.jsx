import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MentorTable = ({ mentors, onDeleteMentor }) => {
  const navigate = useNavigate();

  const handleShowStudents = (mentorId) => {
    navigate(`/mentors/${mentorId}/students`);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Students</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {mentors?.map((mentor) => (
          <tr key={mentor._id}>
            <td>{mentor._id}</td>
            <td>{mentor.name}</td>
            <td>{mentor.email}</td>
            <td>{[...new Set(mentor.studentsId || [])].join(', ')}</td>
            <td>
              <Link to={`/mentors/edit/${mentor._id}`} className="btn btn-secondary btn-sm">
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => onDeleteMentor(mentor._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-info btn-sm ms-2"
                onClick={() => handleShowStudents(mentor._id)}
              >
                Show All Students
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MentorTable;
