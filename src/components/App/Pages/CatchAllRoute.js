import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from './NotFound';

type Props = {
  isAuthorized: boolean,
}

class CatchAllRoute extends React.Component<Props> {
  render () {
    const { isAuthorized } = this.props;

    if (!isAuthorized && window.location.pathname.includes('profile')) {
      return <Navigate to="/sign_in" replace />;
    }

    return <NotFound />;
  }
}

export default CatchAllRoute;
