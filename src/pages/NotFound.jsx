import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="error-page section-padding" style={{ textAlign: 'center' }}>
    <div className="container">
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or may have been moved.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
