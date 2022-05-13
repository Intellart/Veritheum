// @flow
import React from 'react';
import type { Node } from 'react';
import { get, join } from 'lodash';
import './errors.scss';

type Props = {
  error: Object,
  isObject: boolean,
}

function Error(props: Props): Node {
  const { error, isObject } = props;
  const code = get(error, isObject ? 'status' : 'response.status', '400');
  const title = get(error, isObject ? 'title' : 'response.statusText', 'Error');
  const detail = get(error, isObject ? 'detail' : 'response.data.errors', ['Unexpected problem...']);

  return (
    <div className="error-wrapper">
      <h3>{code} - {title}</h3>
      <span>{isObject ? detail : join(detail, ', ')}</span>
    </div>
  );
}

export default Error;
