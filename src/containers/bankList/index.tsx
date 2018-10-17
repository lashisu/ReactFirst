import * as React from "react";
import AsyncFetch from "../../_libs/asyncFetch";
import BankListComponent from "../../components/bankList";
import Config from "../../config";

interface IBankListState {
  banks: any;
  error: any;
  isLoaded: boolean;
}

class BankList extends React.Component<{}, IBankListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      banks: [],
      error: null,
      isLoaded: false
    };
  }

  public notOkHandler = (result: any) => {
    this.setState({
      error: {
        message: `API error: ${result.statusText} (${result.status})`
      },
      isLoaded: true
    });
  };

  public okHandler = (data: any) => {
    this.setState(
      {
        banks: data.banks,
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

  public componentDidMount() {
    AsyncFetch(
      `${Config.apiUrl}/banks`,
      this.okHandler,
      this.notOkHandler,
      this.errorHandler
    );
  }

  public render() {
    return <BankListComponent {...this.state} />;
  }
}

export default BankList;
