import * as React from "react";
import { connect } from "react-redux";
import Actions from "../../_actions";
import AsyncFetch from "../../_libs/asyncFetch";
// import VanActivationTable from "../../components/vanActivationTable";
import DailyPaymentTable from "../../components/dailyPaymentTable";
import Config from "../../config";

interface IListProps {
  alertClear: any;
  alertError: any;
  alertInfo: any;
  alertSuccess: any;
  bankCode: string;
  latestVersion: string;
  page: number;
  pageSize: number;
  totalItem: number;
  onDataUpdated: any;
  onPageChange: any;
  isProcessing: boolean;
  handleFileChosen: any;
  refreshList: any;
}

interface IListStates {
  error: any;
  isLoaded: boolean;
  items: any;
}

class List extends React.Component<IListProps, IListStates> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null
    };
  }
  public notOkHandler = (result: any) => {
    this.setState({
      error: {
        message: `API error: ${result.statusText} (${result.status})`
      },
      isLoaded: true
    });
    this.props.alertError(`API error: ${result.statusText} (${result.status})`);
  };

  public okHandler = (data: any) => {
    this.setState(
      {
        isLoaded: true,
        items: data.items
      },
      this.props.onDataUpdated(data)
    );
    this.props.alertClear();
  };

  public errorHandler = (error: any) => {
    this.setState({
      error,
      isLoaded: true
    });
    this.props.alertError(error.message);
  };

  public async LoadList(bankCode: string, page: number, pageSize: number) {
    this.props.alertInfo("Loading...");
    this.setState(
      { isLoaded: false },
      async () =>
        await AsyncFetch(
          `${
            Config.apiUrl
          }/dailypayments/${bankCode}?page=${page}&pageSize=${pageSize}`,
          this.okHandler,
          this.notOkHandler,
          this.errorHandler
        )
    );
  }

  public async componentWillReceiveProps(a: any) {
    console.log("componentWillReceiveProps");
    if (
      a.bankCode !== this.props.bankCode ||
      a.page !== this.props.page ||
      a.pageSize !== this.props.pageSize ||
      a.latestVersion !== this.props.latestVersion
    ) {
      await this.LoadList(a.bankCode, a.page, a.pageSize);
    }
  }

  public async componentDidMount() {
    await this.LoadList(
      this.props.bankCode,
      this.props.page,
      this.props.pageSize
    );
  }

  public render() {
    return <DailyPaymentTable {...this.props} {...this.state} />;
  }
}

const mapStateToProps = (state: any) => ({
  alert: state.alert
});

const mapDispatchToProps = (dispatch: any) => ({
  alertClear: () => dispatch(Actions.alertActions.clear()),
  alertError: (message: string) =>
    dispatch(Actions.alertActions.error(message)),
  alertInfo: (message: string) => dispatch(Actions.alertActions.info(message)),
  alertSuccess: (message: string) =>
    dispatch(Actions.alertActions.success(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
