import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const ErrorMiddleware: Middleware = () => (next) => (action: any) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.log(action.payload.status);
  }

  return next(action);
};
