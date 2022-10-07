// @flow
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { includes } from 'lodash';
import NotFound from './NotFound/NotFound';

type Props = {
  isAuthorized: boolean,
  isAdmin: boolean,
}

function CatchAllRoute(props: Props): Node {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { isAuthorized, isAdmin } = props;

  useEffect(() => {
    if (isAuthorized && includes(['/sign_in'], location)) {
      navigate('/profile', {
        replace: true,
      });
    }

    if (isAdmin && includes(['/admin'], location)) {
      navigate('/admin-page', {
        replace: true,
      });
    }

    if (!isAuthorized && includes(['/profile', '/settings', '/minting-page'], location)) {
      navigate('/sign_in', {
        replace: true,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, isAdmin]);

  return <NotFound />;
}

export default CatchAllRoute;
