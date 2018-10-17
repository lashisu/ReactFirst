import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";

import {
  login as LoginFunction,
  logout as LogoutFunction
} from "../../_actions";
import Routes from "../../Routes";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/free-solid-svg-icons";

library.add(faFile);

import "./App.css";

interface IAppProps {
  login: typeof LoginFunction;
  logout: typeof LogoutFunction;
  session: any;
  history: History;
}

class App extends React.Component<IAppProps, { isOpen: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public componentDidMount() {
    this.props.login({ username: "User" });
  }

  public loginOnClick = () => {
    this.props.login({ username: "Daniel Heo" });
  };

  public logoutOnClick = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  public render() {
    const { session } = this.props;
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App container">
          <Navbar color="light" light={true} expand="md" className="mb-3">
            <LinkContainer to="/">
              <NavbarBrand>React Wallet</NavbarBrand>
            </LinkContainer>
            {session.isAuthenticated && (
              <React.Fragment>
                <NavbarToggler />
                <Collapse isOpen={this.state.isOpen} navbar={true}>
                  <Nav className="ml-auto" navbar={true}>
                    <LinkContainer to="/banks">
                      <NavItem>
                        <NavLink href="/banks">Banks</NavLink>
                      </NavItem>
                    </LinkContainer>
                    <UncontrolledDropdown nav={true} inNavbar={true}>
                      <DropdownToggle nav={true} caret={true}>
                        Payment
                      </DropdownToggle>
                      <DropdownMenu right={true}>
                        <LinkContainer to="/payments/uob">
                          <DropdownItem>UOB Payment</DropdownItem>
                        </LinkContainer>
                        <LinkContainer to="/dailypayments/uob">
                          <DropdownItem>
                            UOB Daily Payment (Import)
                          </DropdownItem>
                        </LinkContainer>
                        <DropdownItem divider={true} />
                        <LinkContainer to="/unmatchedpayments">
                          <DropdownItem>Unmatched Payment</DropdownItem>
                        </LinkContainer>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav={true} inNavbar={true}>
                      <DropdownToggle nav={true} caret={true}>
                        VAN
                      </DropdownToggle>
                      <DropdownMenu right={true}>
                        <LinkContainer to="/van/mappings">
                          <DropdownItem>VAN Registration</DropdownItem>
                        </LinkContainer>
                        <LinkContainer to="/van/batches">
                          <DropdownItem>VAN Batches</DropdownItem>
                        </LinkContainer>
                        <LinkContainer to="/van/activations/uob">
                          <DropdownItem>
                            UOB VAN Activation (Import)
                          </DropdownItem>
                        </LinkContainer>
                      </DropdownMenu>
                    </UncontrolledDropdown>

                    {!session.isAuthenticated ? (
                      <NavItem>
                        <NavLink onClick={this.loginOnClick}>Login</NavLink>
                      </NavItem>
                    ) : (
                      <UncontrolledDropdown nav={true} inNavbar={true}>
                        <DropdownToggle nav={true}>
                          {session.user.username}
                        </DropdownToggle>
                        <DropdownMenu right={true}>
                          <DropdownItem onClick={this.logoutOnClick}>
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    )}
                  </Nav>
                </Collapse>
              </React.Fragment>
            )}
          </Navbar>

          <Routes isAuthenticated={session.isAuthenticated} />
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
