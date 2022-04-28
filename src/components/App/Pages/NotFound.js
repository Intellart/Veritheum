import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render () {
    return (
      <div className="not-found-wrapper">
        <Link to="/">Return Home</Link>
      </div>
    );
  }
}

export default NotFound;
