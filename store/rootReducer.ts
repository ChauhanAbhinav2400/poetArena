import { combineReducers } from "redux";
import { userReducer } from "./reducers/auth.reducer";

export const rootReducer = combineReducers({
  userReducer,
});
