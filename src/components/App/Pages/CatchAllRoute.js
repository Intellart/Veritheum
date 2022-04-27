import React, { useEffect } from 'react';
import type { Node } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

type Props = {
  isAuthorized: boolean,
}

function CatchAllRoute(props: Props): Node {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { isAuthorized } = props;

  useEffect(() => {
    if (isAuthorized && location.includes('sign_in')) {
      navigate('/profile', {
        replace: true,
      });
    }

    if (!isAuthorized && location.includes('profile')) {
      navigate('/sign_in', {
        replace: true,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  return <NotFound />;
}

export default CatchAllRoute;
