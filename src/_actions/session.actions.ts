import { sessionConstants } from "../_constants";
import { IUserSession } from "../_interfaces";

const login = (user: IUserSession) => ({
  type: sessionConstants.LOGIN,
  user
});

const logout = () => ({
  type: sessionConstants.LOGOUT
});

export const sessionActions = {
  login,
  logout
};
