import { alertConstants } from "../_constants";

export const alertActions = {
  clear,
  error,
  info,
  success,
  warning
};

function clear() {
  return { type: alertConstants.CLEAR };
}

function info(message: string) {
  return { type: alertConstants.INFO, message };
}

function error(message: string) {
  return { type: alertConstants.ERROR, message };
}

function success(message: string) {
  return { type: alertConstants.SUCCESS, message };
}

function warning(message: string) {
  return { type: alertConstants.WARNING, message };
}
