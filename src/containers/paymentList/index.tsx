import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import AsyncFetch from "../../_libs/asyncFetch";
import List from "./list";

import Config from "../../config";

interface IPaymentListProps extends RouteComponentProps<any> {}

interface IPaymentListStates {
  bank: any;
  error: any;
  isLoaded: boolean;
  page: number;
  pageSize: number;
  totalItem: number;
}

class PaymentList extends React.Component<
  IPaymentListProps,
  IPaymentListStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      bank: null,
      error: null,
      isLoaded: false,
      page: 1,
      pageSize: 10,
      totalItem: 0
    };
  }

  public notOkHandler = (result: any) => {
    if (result.status === 204) {
      this.props.history.push("/notfound");
    } else {
      this.setState({
        error: {
          message: `API error: ${result.statusText} (${result.status})`
        },
        isLoaded: true
      });
    }
  };

  public okHandler = (data: any) => {
    this.setState(
      {
        bank: data,
        isLoaded: true
      }
      // this.props.onDataUpdated(data)
    );
  };

  public errorHandler = (error: any) => {
    this.setState({
      error,
      isLoaded: true
    });
  };

  public async componentDidMount() {
    AsyncFetch(
      `${Config.apiUrl}/banks/${this.props.match.params.code}`,
      this.okHandler,
      this.notOkHandler,
      this.errorHandler
    );
  }

  public onPageChange = (e: number) => {
    if (this.state.page !== e) {
      this.setState({
        page: e
      });
    }
  };

  public onDataUpdated = (result: any) => {
    if (
      this.state.page !== result.page ||
      this.state.pageSize !== result.pageSize ||
      this.state.totalItem !== result.totalItem
    ) {
      this.setState({
        page: result.page,
        pageSize: result.pageSize,
        totalItem: result.totalItem
      });
    }
  };

  public render() {
    return (
      <List
        {...this.state}
        bankCode={this.props.match.params.code}
        onPageChange={this.onPageChange}
        onDataUpdated={this.onDataUpdated}
      />
    );
  }
}

export default withRouter(PaymentList);
