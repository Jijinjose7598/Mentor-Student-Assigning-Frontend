import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentTable = ({ students, onDeleteStudent }) => {
  const navigate = useNavigate();

  const handleNoMentorStudentsButtonClick = () => {
    navigate('/students/no-mentors');
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={handleNoMentorStudentsButtonClick}>
        Students with No Mentors
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mentors</th>
            <th>Previous Mentors</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{[...new Set(student.mentorId || [])].join(', ')}</td>
              <td>
                <Link to={`/students/${student._id}/previous-mentors`} className="btn btn-info btn-sm">
                  View Previous Mentors
                </Link>
              </td>
              <td>
                <Link to={`/students/edit/${student._id}`} className="btn btn-secondary btn-sm">
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => onDeleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
