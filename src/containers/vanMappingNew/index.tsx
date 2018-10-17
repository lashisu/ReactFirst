import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AsyncPost from "../../_libs/asyncPost";
import VanMappingForm from "../../components/vanMappingForm";
import Config from "../../config";

interface IVanMappingNewStates {
  bankCode: string;
  digit: number | null;
  errorMessage: string;
  firstNumber: number | null;
  lastNumber: number | null;
  isClicked: boolean;
  isProcessing: boolean;
  isSubmitted: boolean;
  prefix: string;
  successMessage: string;
}

interface IVanMappingNewProps extends RouteComponentProps<any> {}

class VanMappingNew extends React.Component<
  IVanMappingNewProps,
  IVanMappingNewStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      bankCode: "",
      digit: null,
      errorMessage: "",
      firstNumber: null,
      isClicked: false,
      isProcessing: false,
      isSubmitted: false,
      lastNumber: null,
      prefix: "",
      successMessage: ""
    };
  }

  public okHandler = (data: any) => {
    this.setState({
      errorMessage: "",
      isProcessing: false,
      isSubmitted: true,
      successMessage: `${
        data.itemAddedCount
      } Virtual Account Number has succesfully added`
    });
  };

  public notOkHandler = (data: any) => {
    if (data.status === 204) {
      this.props.history.push("/notfound");
    } else {
      this.setState({
        errorMessage: data.errorMessage,
        isProcessing: false,
        isSubmitted: true,
        successMessage: ""
      });
    }
  };

  public errorHandler = (result: any) => {
    this.setState({
      errorMessage: result.statusText,
      isProcessing: false,
      isSubmitted: true,
      successMessage: ""
    });
  };

  public async saveData() {
    if (!this.invalidData()) {
      this.setState({ isProcessing: true }, () => {
        this.setState({ isProcessing: true }, () => {
          const request = {
            bankCode: this.state.bankCode,
            digit: this.state.digit,
            firstNumber: this.state.firstNumber,
            lastNumber: this.state.lastNumber,
            prefix: this.state.prefix
          };

          AsyncPost(
            `${Config.apiUrl}/vamappings`,
            request,
            this.okHandler,
            this.notOkHandler,
            this.errorHandler
          );
        });
      });
    }
  }

  public onSubmit = () => {
    this.setState(
      { isClicked: true, isSubmitted: false, isProcessing: false },
      async () => await this.saveData()
    );
  };

  public onDataChange = (e: any) => {
    if (this.state[e.target.id] !== e.target.value) {
      const change = {};
      change[e.target.id] = e.target.value;
      this.setState(change);
    }
  };

  public invalidBankCode = () => {
    return this.state.isClicked && this.state.bankCode === "";
  };

  public invalidPrefix = () => {
    return this.state.isClicked && (this.state.prefix || "") === "";
  };

  public invalidDigit = () => {
    return this.state.isClicked && (this.state.digit || 0) <= 0;
  };

  public invalidFirstNumber = () => {
    return this.state.isClicked && (this.state.firstNumber || 0) <= 0;
  };

  public invalidLastNumber = () => {
    return (
      (this.state.isClicked && (this.state.lastNumber || 0) <= 0) ||
      this.invalidLastNumberValue()
    );
  };

  public invalidLastNumberValue = () => {
    if (this.state.firstNumber === null || this.state.lastNumber === null) {
      return false;
    }

    return (
      this.state.isClicked &&
      parseInt(this.state.lastNumber.toString(), 10) <=
        parseInt(this.state.firstNumber.toString(), 10)
    );
  };

  public invalidData = () => {
    return (
      this.invalidBankCode() ||
      this.invalidDigit() ||
      this.invalidFirstNumber() ||
      this.invalidLastNumber() ||
      this.invalidPrefix()
    );
  };

  public render() {
    return (
      <VanMappingForm
        onChange={this.onDataChange}
        onSubmit={this.onSubmit}
        {...this.state}
        invalidBankCode={this.invalidBankCode}
        invalidDigit={this.invalidDigit}
        invalidFirstNumber={this.invalidFirstNumber}
        invalidLastNumber={this.invalidLastNumber}
        invalidLastNumberValue={this.invalidLastNumberValue}
        invalidPrefix={this.invalidPrefix}
      />
    );
  }
}

export default withRouter(VanMappingNew);
