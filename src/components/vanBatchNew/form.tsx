import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import AsyncPost from "../../_libs/asyncPost";
import Config from "../../config";
import BankDropdown from "../../controls/bankDropdown";
import PageHeader from "../../controls/pageHeader";

interface IVanBatchFormProps extends RouteComponentProps<any> {
  bankCode: string;
}

interface IVanBatchFormStates {
  bankCode: string;
  currency: string;
  isClicked: boolean;
  processing: boolean;
  vaCount: number | null;
}

const minVaCount = 1;
const maxVaCount = 3000;

class VanBatchForm extends React.Component<
  IVanBatchFormProps,
  IVanBatchFormStates
> {
  constructor(props: IVanBatchFormProps) {
    super(props);
    this.state = {
      bankCode: "",
      currency: "THB",
      isClicked: false,
      processing: false,
      vaCount: null
    };
  }

  public okHandler = (result: any) => {
    this.setState({ processing: false }, () => {
      const element = document.createElement("a");
      const file = new Blob([result.fileContents.join("\r\n")], {
        type: "text/css;charset=ANSI"
      });
      element.href = URL.createObjectURL(file);
      element.download = result.fileName + ".txt";
      element.click();
      this.props.history.push("/van/batches");
    });
  };

  public notOkHandler = () => {
    console.log("not OK");
  };

  public errorHandler = () => {
    console.log("error");
  };

  public async SubmitRequest() {
    const data = {
      bankCode: this.state.bankCode,
      currency: this.state.currency,
      vaCount: this.state.vaCount
    };
    await AsyncPost(
      `${Config.apiUrl}/vabatches`,
      data,
      this.okHandler,
      this.notOkHandler,
      this.errorHandler
    );
  }

  public invalidBankCode = () => {
    return this.state.isClicked && this.state.bankCode === "";
  };

  public emptyVaCount = (): boolean => {
    return this.state.isClicked && this.state.vaCount === null;
  };

  public invalidVaCount = (): boolean => {
    return (
      this.state.isClicked &&
      (this.state.vaCount !== null &&
        (this.state.vaCount < minVaCount || this.state.vaCount > maxVaCount))
    );
  };

  public invalidCurrency = (): boolean => {
    return this.state.isClicked && this.state.currency === "";
  };

  public isFormValid = (): boolean => {
    return (
      !this.invalidBankCode() &&
      !this.emptyVaCount() &&
      !this.invalidVaCount() &&
      !this.invalidCurrency()
    );
  };

  public processOnClicked = () => {
    if (this.isFormValid()) {
      this.setState(
        {
          processing: true
        },
        () => this.SubmitRequest()
      );
    }
  };

  public onSubmitClicked = () => {
    if (!this.state.isClicked) {
      this.setState(
        {
          isClicked: true
        },
        () => this.processOnClicked()
      );
    } else {
      this.processOnClicked();
    }
  };

  public onChanged = (e: any) => {
    if (this.state[e.target.id] !== e.target.value) {
      const change = {};
      change[e.target.id] =
        e.target.id === "currency"
          ? e.target.value.toUpperCase()
          : e.target.value;
      this.setState(change);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <PageHeader>New Batch</PageHeader>
        {this.state.processing && (
          <Alert color="primary">
            Your request are being process. It may takes a few minutes, depend
            on number of Virtual Account
          </Alert>
        )}
        <Form>
          <FormGroup row={true}>
            <Label for="bankCode" sm={4}>
              Bank
            </Label>
            <Col sm={8}>
              <BankDropdown
                id="bankCode"
                invalid={this.invalidBankCode()}
                onChange={this.onChanged}
                disabled={this.state.processing}
              />
              <FormFeedback>
                Bank is required. Please select from dropdown.
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="vaCount" sm={4}>
              Number of Virtual Account
            </Label>
            <Col sm={8}>
              <Input
                type="number"
                disabled={this.state.processing}
                id="vaCount"
                invalid={this.emptyVaCount() || this.invalidVaCount()}
                onChange={this.onChanged}
                value={this.state.vaCount || ""}
              />
              <FormFeedback>
                {this.emptyVaCount()
                  ? "Number of Virtual Account is required. Please enter a value."
                  : "Invalid number. Min: " +
                    minVaCount +
                    "; Max: " +
                    maxVaCount}
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="currency" sm={4}>
              Currency Code
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                disabled={true}
                id="currency"
                invalid={this.invalidCurrency()}
                onChange={this.onChanged}
                value={this.state.currency || ""}
              />
              <FormFeedback>Currency Code is required.</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Col sm={{ size: 8, offset: 4 }}>
              <Button
                type="button"
                onClick={this.onSubmitClicked}
                disabled={this.state.processing}
                color="primary"
              >
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </React.Fragment>
    );
  }
}

export default withRouter(VanBatchForm);
