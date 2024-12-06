import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/userhomepage.css';

const UserHomePage = () => {
  return (
    <div className="home-page">
      <div className="header">Header</div>
      <div className="options">Options</div>
      <div className="content">Content</div>
    </div>
  );
};

export { UserHomePage };
