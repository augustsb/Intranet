import { get, isString } from 'lodash';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { push } from 'redux-first-history';
import { generatePath as generatePathBase, matchPath } from 'react-router';

export const generatePath = (
  route: string | object,
  params?: any,
  isFull = false,
) => {
  const path = get(
    route,
    isFull ? 'fullPath' : 'pattern.path',
    isString(route) ? route : undefined,
  );
  return path ? generatePathBase(path, params) : '/';
};

export const isActiveRoute = (route: string | object, url: string): boolean => {
  const path = get(route, 'fullPath', isString(route) ? route : undefined);
  return path ? !!matchPath(path, url) : false;
};

export const navigateToPath =
  (path: string) => (dispatch: ThunkDispatch<any, any, AnyAction>) =>
    dispatch(push(path));

export const navigateToRoute =
  (route: string | object, params?: any) =>
  (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const path = generatePath(route, params, true);
    dispatch(push(path));
  };
