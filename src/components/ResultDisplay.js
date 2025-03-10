import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div>
      <h2>Participation Record</h2>
      <p>Name: {result.name}</p>
      <p>Email: {result.email}</p>
      <p>Class Date: {result.classDate}</p>
      <p>Participation: {result.participation ? 'Present' : 'Absent'}</p>
    </div>
  );
};

export default ResultDisplay;