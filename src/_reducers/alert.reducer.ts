import { alertConstants } from "../_constants";

const alert = (state = {}, action: any) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        message: action.message,
        type: "alert-success"
      };
    case alertConstants.ERROR:
      return {
        message: action.message,
        type: "alert-danger"
      };
    case alertConstants.INFO:
      return {
        message: action.message,
        type: "alert-info"
      };
    case alertConstants.WARNING:
      return {
        message: action.message,
        type: "alert-warning"
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
