import { sessionConstants } from "../_constants";

const defaultState = {
  isAuthenticated: false,
  user: null
};

const session = (state: any = defaultState, action: any) => {
  switch (action.type) {
    case sessionConstants.LOGIN:
      return {
        isAuthenticated: action.user !== null,
        user: action.user
      };
    case sessionConstants.LOGOUT: {
      return defaultState;
    }
    default:
      return state;
  }
};

export default session;
