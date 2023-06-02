import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import api, {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
  dispatchAPICallback,
} from './api';

const middleware = [api];
const mockStore = configureStore(middleware);

describe('API middleware', () => {
  let mockHTTP;
  let store;
  beforeEach(() => {
    mockHTTP = new MockAdapter(axios);
    const initialState = {};
    store = mockStore(initialState);
  });
  describe('dispatchAPICallback', () => {
    it('does nothing when action is undefined', async () => {
      const action = undefined;
      dispatchAPICallback(store.dispatch, action);
      const actions = store.getActions();
      expect(actions.length).toBe(0);
    });
    it('does logs error when action is invalid type', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      const actionCreator = 666;
      dispatchAPICallback(store.dispatch, actionCreator);
      expect(
        consoleSpy.mock.calls
          .toString()
          .includes('Unhandled API callback type'),
      ).toBe(true);
      const actions = store.getActions();
      expect(actions.length).toBe(0);
    });
    it('dispatches a callback from an action type (string)', async () => {
      const actionType = 'exampleActionType';
      const payload = { monkeys: 'bananas' };
      dispatchAPICallback(store.dispatch, actionType, payload);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(actionType);
      expect(actions[0].payload).toBe(payload);
    });
    it('dispatches a callback from an action creator (function)', async () => {
      const actionCreator = createAction('exampleAction');
      const payload = { monkeys: 'bananas' };
      dispatchAPICallback(store.dispatch, actionCreator, payload);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(actionCreator.type);
      expect(actions[0].payload).toBe(payload);
    });
    it('does not pass payload when non is defined', async () => {
      const actionCreator = createAction('exampleAction');
      dispatchAPICallback(store.dispatch, actionCreator);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(actionCreator.type);
      expect(actions[0].payload).toBeUndefined();
    });
  });
  describe('apiCallBegan', () => {
    it('makes an HTTP request and dispatches a response action', async () => {
      const url = '/animals/alpaca';
      const onStart = 'onStartActionType';
      const onSuccess = 'onSuccessActionType';
      const onError = 'onErrorActionType';
      const payload = {
        url,
        method: 'GET',
        onStart,
        onSuccess,
        onError,
      };
      const responsePayload = { name: 'Lachlan' };
      mockHTTP.onGet(url).reply(200, responsePayload);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(4);
      expect(actions[0].type).toBe(onStart);
      expect(actions[1].type).toBe(apiCallBegan.type);
      expect(actions[1].payload).toBe(payload);
      expect(actions[2].type).toBe(apiCallSuccess.type);
      expect(actions[3].type).toBe(onSuccess);
      expect(actions[3].payload).toStrictEqual(responsePayload);
    });
    it('makes an HTTP request and dispatches an error action', async () => {
      const url = '/animals/alpaca';
      const onError = 'onErrorActionType';
      const payload = {
        url,
        method: 'GET',
        onError,
      };
      mockHTTP.onGet().reply(500);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe(apiCallBegan.type);
      expect(actions[0].payload).toBe(payload);
      expect(actions[1].type).toBe(apiCallFailed.type);
      expect(actions[2].type).toBe(onError);
    });
  });
});
