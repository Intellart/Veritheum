// @flow
import * as API from '../api';
import type { ReduxAction, ReduxState, ReduxActionWithPayload } from '../types';

export type StudyField = {
  id: number,
  field_name: string,
}

export type State = StudyField[];

export const types = {
  STUDY_FIELD_GET_STUDY_FIELDS: 'STUDY_FIELD/GET_STUDY_FIELDS',
  STUDY_FIELD_GET_STUDY_FIELDS_PENDING: 'STUDY_FIELD/GET_STUDY_FIELDS_PENDING',
  STUDY_FIELD_GET_STUDY_FIELDS_REJECTED: 'STUDY_FIELD/GET_STUDY_FIELDS_REJECTED',
  STUDY_FIELD_GET_STUDY_FIELDS_FULFILLED: 'STUDY_FIELD/GET_STUDY_FIELDS_FULFILLED',
};

export const selectors = {
  getStudyFields: (state: ReduxState): State => state.studyFields,
};

export const actions = {
  getStudyFields: (): ReduxAction => ({
    type: types.STUDY_FIELD_GET_STUDY_FIELDS,
    payload: API.getRequest('intellart/study_fields'),
  }),
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.STUDY_FIELD_GET_STUDY_FIELDS_FULFILLED:
      return { ...state, ...action.payload };

    default:
      return state || {};
  }
};
