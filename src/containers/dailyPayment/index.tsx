import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Actions from "../../_actions";
import AsyncPost from "../../_libs/asyncPost";
import Config from "../../config";
import List from "./list";

interface IDailyTransactionProps extends RouteComponentProps<any> {
  alert: any;
  alertClear: any;
  alertError: any;
  alertInfo: any;
  alertSuccess: any;
}

interface IDailyTransactionStates {
  fileName: string;
  isProcessing: boolean;
  page: number;
  pageSize: number;
  totalItem: number;
  latestVersion: string;
}

let fileReader: any;

class DailyTransaction extends React.Component<
  IDailyTransactionProps,
  IDailyTransactionStates
> {
  constructor(props: IDailyTransactionProps) {
    super(props);
    this.state = {
      fileName: "",
      isProcessing: false,
      latestVersion: "",
      page: 1,
      pageSize: 10,
      totalItem: 0
    };
  }

  public componentDidMount() {
    this.props.alertClear();
  }

  public readFileOK = (a: any) => {
    if (a.isSuccess) {
      this.props.alertSuccess(
        `File Upload Finish. ${a.totalActivated} transactions saved`
      );
    } else {
      this.props.alertError(
        `File Upload finish with error (${a.errorMessage})`
      );
    }
    this.refreshList();
  };

  public readFileNotOK = (a: any) => {
    console.log("Not OK", a);
    this.refreshList();
  };

  public readFileFailed = (a: any) => {
    console.log("Failed", a);
    this.refreshList();
  };

  public handleFileRead = () => {
    const content = fileReader.result;
    const arr = content
      .split("\n")
      .map((ar: string) => ar.replace("\r", ""))
      .filter((ar: string) => ar.length > 0);

    const request = {
      contents: arr,
      currency: "THB",
      fileName: this.state.fileName
    };

    console.log(JSON.stringify(request));
    this.props.alertInfo("Uploading file...");
    AsyncPost(
      `${Config.apiUrl}/UobFileUploads/billerTransactions`,
      request,
      this.readFileOK,
      this.readFileNotOK,
      this.readFileFailed
    );

    this.setState({ isProcessing: false });
  };

  public handleFileChosen = (e: any) => {
    console.log(e.target.files[0]);
    const fileName = e.target.files[0].name;
    this.setState({ fileName, isProcessing: true });
    this.props.alertInfo("Reading file...");
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(e.target.files[0]);
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

  public refreshList = () => {
    this.setState({
      latestVersion: moment().format("YYYMMDD HHmmssms")
    });
  };

  public onPageChange = (e: number) => {
    if (this.state.page !== e) {
      this.setState({
        page: e
      });
    }
  };

  public render() {
    return (
      <React.Fragment>
        <List
          handleFileChosen={this.handleFileChosen}
          {...this.state}
          bankCode={this.props.match.params.code}
          onDataUpdated={this.onDataUpdated}
          onPageChange={this.onPageChange}
          refreshList={this.props}
        />
      </React.Fragment>
    );
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
)(withRouter(DailyTransaction));
