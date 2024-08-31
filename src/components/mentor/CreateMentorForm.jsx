import React, { useState } from 'react';
import '../../App.css'; // Assuming you have a CSS file for the styles

const CreateMentorForm = ({ onAddMentor, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/mentors/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        const newMentor = await response.json();
        onAddMentor(newMentor); // Call the function to add the new mentor to the table
        onClose();
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
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateMentorForm;
