import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditingStudentForm = ({ onUpdateStudent }) => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ _id: '', name: '', email: '', mentorId: [] });
  const [newMentorId, setNewMentorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students/student/${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStudent(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const updateData = { ...student };
    if (newMentorId) {
      updateData.mentorId = Array.isArray(student.mentorId) ? [...student.mentorId, newMentorId] : [newMentorId];
    }

    const response = await fetch(`http://localhost:3000/students/update/student/${student._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error('Failed to update student data');
    }
    const result = await response.json();
    if (typeof onUpdateStudent === 'function') {
      onUpdateStudent(result.data);
    } else {
      console.error('onUpdateStudent is not a function');
    }
    navigate('/students');
  } catch (err) {
    setError(err.message);
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputId" className="form-label">Student ID</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputId"
          name="_id"
          value={student._id}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName"
          name="name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail"
          name="email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputMentorIds" className="form-label">Mentor IDs</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputMentorIds"
          name="mentorIds"
          value={(student.mentorId || []).join(', ')}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputNewMentorId" className="form-label">Add New Mentor ID</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputNewMentorId"
          name="newMentorId"
          value={newMentorId}
          onChange={(e) => setNewMentorId(e.target.value)}
          
        />
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
};

export default EditingStudentForm;
