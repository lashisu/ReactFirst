import { connect } from "react-redux";
import { login, logout } from "../../_actions";
import { IUserSession } from "../../_interfaces";
import App from "../../components/app";

const mapStateToProps = (state: any) => ({
  session: state.session
});
const mapDispatchToProps = (dispatch: any) => ({
  login: (user: IUserSession) => dispatch(login(user)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
