import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from 'client/store/middleware/api/api';

const example = createSlice({
  name: 'example',
  initialState: {
    isLoading: false,
    message: '',
  },
  reducers: {
    exampleRequested: (example) => {
      example.isLoading = true;
    },
    exampleReceived: (example, action) => {
      example.isLoading = false;
      example.message = action.payload.message;
    },
  },
});

export const { exampleRequested, exampleReceived } = example.actions;
export default example.reducer;

export const getExampleMessage = () =>
  // @ts-ignore
  apiCallBegan({
    url: `/api/example`,
    method: 'GET',
    onStart: exampleRequested.type,
    // @ts-ignore
    onSuccess: (response) => ({
      type: exampleReceived.type,
      payload: response,
    }),
  });
