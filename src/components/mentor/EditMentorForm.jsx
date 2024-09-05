import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditMentorForm = ({ onUpdateMentor }) => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState({ name: '', email: '', studentsId: [''] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStudentId, setNewStudentId] = useState('');

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await fetch(`https://mentor-student-assigning-backend.onrender.com/mentors/mentor/${mentorId}`);
        if (!response.ok) throw new Error('Failed to fetch mentor data');
        const data = await response.json();
        setMentor({ ...data.data, studentsId: data.data.studentsId || [''] });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStudentsId = [...new Set([ newStudentId])];
    try {
      const response = await fetch(`https://mentor-student-assigning-backend.onrender.com/mentors/update/mentor/${mentor._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mentor, studentsId: updatedStudentsId }),
      });
      if (!response.ok) throw new Error('Failed to update mentor');
      const data = await response.json();
      onUpdateMentor(data.data);
      navigate('/mentors');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName"
          name="name"
          value={mentor.name}
          onChange={(e) => setMentor({ ...mentor, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail"
          name="email"
          value={mentor.email}
          onChange={(e) => setMentor({ ...mentor, email: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputStudentIds" className="form-label">Student IDs</label>
        <input
          type="text"
          className="form-control mb-2"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Mentor</button>
    </form>
  );
};

export default EditMentorForm;
