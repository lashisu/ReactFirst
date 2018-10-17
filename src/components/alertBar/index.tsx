import * as React from "react";
import { Alert } from "reactstrap";

interface IAlertBarProps {
  message: string;
  type: string;
}

class AlertBar extends React.Component<IAlertBarProps, {}> {
  public render() {
    const { message, type } = this.props;

    let color;
    switch (type) {
      case "alert-danger":
        color = "danger";
        break;
      case "alert-success":
        color = "success";
        break;
      case "alert-warning":
        color = "warning";
        break;
      case "alert-info":
      default:
        color = "info";
        break;
    }
    return type ? <Alert color={color}>{message}</Alert> : null;
  }
}

export default AlertBar;
