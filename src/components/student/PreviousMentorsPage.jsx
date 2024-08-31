import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PreviousMentorPage = () => {
  const { studentId } = useParams();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviousMentors = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students/${studentId}/previous-mentors`);
        if (!response.ok) {
          throw new Error('Failed to fetch previous mentors');
        }
        const data = await response.json();
        setMentors(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPreviousMentors();
  }, [studentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Previous Mentors</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Mentor ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <tr key={mentor._id}>
                <td>{mentor._id}</td>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No previous mentors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousMentorPage;
