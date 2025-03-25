import { LOGIN, LOGOUT } from "../actions/auth.action";

const intialState = {
  user: null,
  isAuthenticated: false,
};

export const userReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
