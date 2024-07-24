import React from 'react';

const Timestamp = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { // Adjust locale and options as needed
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <span>{formattedDate}</span>
  );
};

export default Timestamp;
