import * as React from "react";
import { connect } from "react-redux";
import AlertBar from "../../components/alertBar";

interface IAlertProps {
  message: string;
  type: string;
}

class Alert extends React.Component<IAlertProps, {}> {
  public render() {
    return <AlertBar {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  message: state.alert.message,
  type: state.alert.type
});

export default connect(mapStateToProps)(Alert);
