import { sessionConstants } from "../_constants";
import { IUserSession } from "../_interfaces";
import { alertActions } from "./alert.actions";

export const logout = () => ({
  type: sessionConstants.LOGOUT
});

export const login = (user: IUserSession) => ({
  type: sessionConstants.LOGIN,
  user
});

export default { alertActions };
