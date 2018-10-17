import * as moment from "moment";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AsyncFetch from "../../_libs/asyncFetch";
import AsyncPost from "../../_libs/asyncPost";
import PaymentForm from "../../components/paymentForm";
import Config from "../../config";

interface IPaymentNewProps extends RouteComponentProps<any> {}

interface IPaymentNewStates {
  amount: number | null;
  bank: any;
  bankReffNo: string | null;
  currency: string | null;
  error: any;
  errorMessage: string | null;
  isClicked: boolean;
  isLoaded: boolean;
  isProcessing: boolean;
  saved: boolean;
  successMessage: string | null;
  transactionDate: Date | null;
  van: string | null;
}

class PaymentNew extends React.Component<IPaymentNewProps, IPaymentNewStates> {
  constructor(props: IPaymentNewProps) {
    super(props);
    this.state = {
      amount: null,
      bank: null,
      bankReffNo: null,
      currency: null,
      error: null,
      errorMessage: null,
      isClicked: false,
      isLoaded: false,
      isProcessing: false,
      saved: false,
      successMessage: null,
      transactionDate: moment().toDate(),
      van: null
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
        isLoaded: true,
        isProcessing: false
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

  public postOkHandler = (data: any) => {
    if (data.isSuccess) {
      this.setState({
        errorMessage: null,
        isProcessing: false,
        saved: true,
        successMessage: "Payment has successfully save"
      });
    } else {
      this.setState({
        errorMessage: data.errorMessage,
        isProcessing: false,
        saved: true,
        successMessage: null
      });
    }
  };

  public postNotOkHandler = (result: any) => {
    this.setState({
      errorMessage: `API error: ${result.statusText} (${result.status})`,
      isProcessing: false,
      saved: true,
      successMessage: null
    });
  };

  public postErrorHandler = (error: any) => {
    console.log(error);
    this.setState({
      errorMessage: error,
      isLoaded: true,
      isProcessing: false,
      saved: true,
      successMessage: null
    });
  };

  public errorHandler = (error: any) => {
    console.log(error);
    this.setState({
      errorMessage: error,
      isLoaded: true,
      isProcessing: false,
      saved: true,
      successMessage: null
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

  public onTransactionDateChange = (value: any) => {
    this.setState({
      transactionDate: value.toDate()
    });
  };

  public onDataChange = (e: any) => {
    if (this.state[e.target.id] !== e.target.value) {
      const change = {};
      change[e.target.id] =
        e.target.id === "currency" || e.target.id === "van"
          ? e.target.value.toUpperCase()
          : e.target.value;
      this.setState(change);
    }
  };

  public saveData = () => {
    if (!this.invalidData()) {
      this.setState({ isProcessing: true, saved: false }, () => {
        const request = {
          amount: this.state.amount,
          bankCode: "UOB",
          bankReffNo: this.state.bankReffNo,
          currency: this.state.currency,
          transactionDate: this.state.transactionDate,
          virtualAccountNumber: this.state.van
        };

        AsyncPost(
          `${Config.apiUrl}/payments`,
          request,
          this.postOkHandler,
          this.postNotOkHandler,
          this.postErrorHandler
        );
      });
    }
  };

  public onSubmit = () => {
    this.setState(
      {
        isClicked: true
      },
      () => this.saveData()
    );
  };

  public invalidVan = () => {
    return this.state.isClicked && (this.state.van || "") === "";
  };

  public invalidCurrency = () => {
    return this.state.isClicked && (this.state.currency || "") === "";
  };

  public invalidBankReffNo = () => {
    return this.state.isClicked && (this.state.bankReffNo || "") === "";
  };

  public invalidAmount = () => {
    return this.state.isClicked && (this.state.amount || 0) === 0;
  };

  public invalidData = () => {
    return (
      this.invalidAmount() ||
      this.invalidBankReffNo() ||
      this.invalidCurrency() ||
      this.invalidVan()
    );
  };

  public render() {
    return (
      <PaymentForm
        {...this.state}
        invalidAmount={this.invalidAmount}
        invalidBankReffNo={this.invalidBankReffNo}
        invalidCurrency={this.invalidCurrency}
        invalidVan={this.invalidVan}
        onChange={this.onDataChange}
        onSubmit={this.onSubmit}
        onTransactionDateChange={this.onTransactionDateChange}
      />
    );
  }
}

export default withRouter(PaymentNew);
