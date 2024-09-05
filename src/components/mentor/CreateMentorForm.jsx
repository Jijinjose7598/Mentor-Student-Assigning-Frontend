import React, { useState } from 'react';
import '../../App.css'; // Assuming you have a CSS file for the styles

const CreateMentorForm = ({ onAddMentor, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mentor-student-assigning-backend.onrender.com/mentors/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, studentId }),
      });
      if (response.ok) {
        const newMentor = await response.json();
        onAddMentor(newMentor); // Call the function to add the new mentor to the table
        onClose(); // Close the form after successful submission
      } else {
        console.error('Failed to create mentor');
      }
    } catch (error) {
      console.error('Error creating mentor:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="full-width-form">
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputStudentId" className="form-label">StudentId</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputStudentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateMentorForm;
