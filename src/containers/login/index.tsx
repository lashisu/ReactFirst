import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { login } from "../../_actions";
import { IUserSession } from "../../_interfaces";
import FacebookLogin from "../facebookLogin";

interface ILoginProps extends RouteComponentProps<any> {
  login: any;
}

class Login extends React.Component<ILoginProps, {}> {
  public onClick = () => {
    this.props.login({
      username: "Daniel Heo"
    });
  };

  public responseFacebook = (response: any) => {
    this.props.login({
      fbAccessToken: response.accessToken,
      fbId: response.id,
      fbUserId: response.userID,
      username: response.name
    });
  };

  public componentDidMount() {
    this.props.login({
      username: "Daniel Heo"
    });
  }

  public render() {
    return (
      <React.Fragment>
        <FacebookLogin
          appId="532067183877497"
          autoLoad={false}
          callback={this.responseFacebook}
          // xfbml={true}
          // cookie={false}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  session: state.session
});
const mapDispatchToProps = (dispatch: any) => ({
  login: (user: IUserSession) => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
