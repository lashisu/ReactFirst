import * as React from "react";
import { Route, Switch } from "react-router";
import AuthenticatedRoute from "./authenticatedRoute";
import UnauthenticatedRoute from "./unauthenticatedRoute";

import BankEditor from "../components/bankEditor";
import Home from "../components/home";
import NotFound from "../components/notFound";

import VanBatchList from "../components/vanBatchList";
import VanBatchNew from "../components/vanBatchNew";
import VanMappingList from "../components/vanMappingList";

import BankList from "../containers/bankList";
import DailyPayment from "../containers/dailyPayment";
import Login from "../containers/login";
import PaymentList from "../containers/paymentList";
import PaymentNew from "../containers/paymentNew";
import VanActivation from "../containers/vanActivation";
import VanMappingNew from "../containers/vanMappingNew";

interface IRouterProps {
  isAuthenticated: boolean;
}

class Routes extends React.Component<IRouterProps, {}> {
  public render() {
    return (
      <Switch>
        <AuthenticatedRoute
          path="/"
          exact={true}
          component={Home}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/banks/:id/edit"
          component={BankEditor}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/banks"
          component={BankList}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/dailypayments/:code"
          component={DailyPayment}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />

        <AuthenticatedRoute
          path="/payments/:code/new"
          component={PaymentNew}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/payments/:code"
          component={PaymentList}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/van/activations/:code"
          component={VanActivation}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/van/batches/new"
          component={VanBatchNew}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/van/batches"
          component={VanBatchList}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/van/mappings/new"
          component={VanMappingNew}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <AuthenticatedRoute
          path="/van/mappings"
          component={VanMappingList}
          excact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <UnauthenticatedRoute
          path="/login"
          component={Login}
          exact={true}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default Routes;
