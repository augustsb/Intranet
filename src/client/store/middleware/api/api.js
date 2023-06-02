import { isFunction, isString } from 'lodash';
import axios from 'axios';
import { User } from '@oliasoft/authentication/pkce';
import { createAction } from '@reduxjs/toolkit';
import ClientConfig from 'client/config';

export const apiCallBegan = createAction('api/CallBegan');

export const apiCallSuccess = createAction('api/CallSuccess');

export const apiCallFailed = createAction('api/CallFailed');

export const dispatchAPICallback = (dispatch, action, payload) => {
  if (action) {
    if (isFunction(action)) {
      dispatch(action(payload));
    } else if (isString(action)) {
      dispatch({
        type: action,
        ...(payload ? { payload } : {}),
      });
    } else {
      console.error('Unhandled API callback type');
    }
  }
};

const getAccessToken = () => {
  const oidcStorage = localStorage.getItem(
    `oidc.user:${ClientConfig.config.idpServerUrl}:${ClientConfig.config.applicationId}`,
  );
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage)?.access_token || '';
};

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) {
      return next(action);
    }

    const {
      baseUrl = ClientConfig.config.baseApiUrl,
      url,
      method,
      headers,
      data,
      params,
      onStart,
      onSuccess,
      onError,
    } = action.payload;

    if (onStart) {
      dispatchAPICallback(dispatch, onStart);
    }
    next(action);

    try {
      const response = await axios.request({
        url,
        method,
        baseURL: baseUrl,
        headers: {
          ...headers,
          Authorization: `Bearer ${getAccessToken(getState())}`,
        },
        params,
        data,
      });
      dispatch(apiCallSuccess(response.data));
      dispatchAPICallback(dispatch, onSuccess, response.data);
    } catch (error) {
      dispatch(apiCallFailed(error));
      dispatchAPICallback(dispatch, onError, error);
    }
  };

export default api;
