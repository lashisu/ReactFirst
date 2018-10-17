import * as React from "react";
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
import BankDropdown from "../../controls/bankDropdown";
import PageHeader from "../../controls/pageHeader";

interface IVanMappingFormProps {
  bankCode: string;
  digit: number | null;
  errorMessage: string;
  firstNumber: number | null;
  lastNumber: number | null;
  isClicked: boolean;
  isProcessing: boolean;
  isSubmitted: boolean;
  invalidBankCode: any;
  invalidPrefix: any;
  invalidDigit: any;
  invalidFirstNumber: any;
  invalidLastNumber: any;
  invalidLastNumberValue: any;
  onChange: any;
  onSubmit: any;
  prefix: string;
  successMessage: string;
}

class VanMappingForm extends React.Component<IVanMappingFormProps, {}> {
  constructor(props: IVanMappingFormProps) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <PageHeader>New VAN Registration</PageHeader>
        {this.props.isProcessing && (
          <Alert color="primary">
            Your request are being process. It may takes a few minutes, depend
            on number of Virtual Account being registered.
          </Alert>
        )}
        {this.props.isSubmitted &&
          this.props.errorMessage !== "" && (
            <Alert color="danger">
              Request cannot be completed. {this.props.errorMessage}
            </Alert>
          )}
        {this.props.isSubmitted &&
          this.props.successMessage !== "" && (
            <Alert color="success">{this.props.successMessage}</Alert>
          )}
        <Form>
          <FormGroup row={true}>
            <Label for="bankCode" sm={4}>
              Bank
            </Label>
            <Col sm={8}>
              <BankDropdown
                id="bankCode"
                invalid={this.props.invalidBankCode()}
                onChange={this.props.onChange}
                disabled={this.props.isProcessing}
              />
              <FormFeedback>
                Bank is required. Please select from dropdown.
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="prefix" sm={4}>
              Prefix
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                id="prefix"
                invalid={this.props.invalidPrefix()}
                value={this.props.prefix}
                onChange={this.props.onChange}
                disabled={this.props.isProcessing}
              />
              <FormFeedback>Prefix is required.</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="digit" sm={4}>
              Length
            </Label>
            <Col sm={8}>
              <Input
                type="number"
                id="digit"
                invalid={this.props.invalidDigit()}
                value={this.props.digit || ""}
                onChange={this.props.onChange}
                disabled={this.props.isProcessing}
              />
              <FormFeedback>
                Length is required and should be bigger than 0.
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="firstNumber" sm={4}>
              First Number
            </Label>
            <Col sm={8}>
              <Input
                type="number"
                id="firstNumber"
                invalid={this.props.invalidFirstNumber()}
                value={this.props.firstNumber || ""}
                onChange={this.props.onChange}
                disabled={this.props.isProcessing}
              />
              <FormFeedback>
                First Number is required and should be bigger than 0
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="lastNumber" sm={4}>
              Last Number
            </Label>
            <Col sm={8}>
              <Input
                type="number"
                id="lastNumber"
                invalid={this.props.invalidLastNumber()}
                value={this.props.lastNumber || ""}
                onChange={this.props.onChange}
                disabled={this.props.isProcessing}
              />
              <FormFeedback>
                Last Number is required and shoud be bigger than 0.
              </FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Col sm={{ size: 8, offset: 4 }}>
              <Button
                type="button"
                onClick={this.props.onSubmit}
                disabled={this.props.isProcessing}
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

export default VanMappingForm;
