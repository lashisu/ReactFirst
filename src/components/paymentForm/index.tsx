import * as moment from "moment";
import * as React from "react";
import DatePicker from "react-datepicker";
import { LinkContainer } from "react-router-bootstrap";
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

import PageHeader from "../../controls/pageHeader";

import "react-datepicker/dist/react-datepicker.css";

interface IPaymentNewProps {
  bank: any;
  bankReffNo: any;
  currency: string | null;
  amount: number | null;
  errorMessage: string | null;
  invalidAmount: any;
  invalidCurrency: any;
  invalidVan: any;
  invalidBankReffNo: any;
  isProcessing: boolean;
  onChange: any;
  onTransactionDateChange: any;
  onSubmit: any;
  saved: boolean;
  successMessage: string | null;
  van: string | null;
  transactionDate: Date | null;
}

class PaymentNew extends React.Component<IPaymentNewProps, {}> {
  public render() {
    const { bank } = this.props;
    return (
      <React.Fragment>
        <PageHeader>
          New Payment{" "}
          <small>
            {this.props.bank &&
              `${this.props.bank.name} (${this.props.bank.code})`}
          </small>
        </PageHeader>
        {this.props.isProcessing && (
          <Alert color="primary">Saving data ...</Alert>
        )}
        {this.props.saved &&
          this.props.successMessage && (
            <Alert color="success">{this.props.successMessage}</Alert>
          )}
        {this.props.saved &&
          this.props.errorMessage && (
            <Alert color="danger">{this.props.errorMessage}</Alert>
          )}
        {bank && (
          <Form>
            <FormGroup row={true}>
              <Label for="bank" sm={4}>
                Bank
              </Label>
              <Col sm={8}>
                <Input
                  id="bank"
                  type="text"
                  disabled={true}
                  value={bank.name + " (" + bank.code + ")"}
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="transactionDate" sm={4}>
                Transaction Date
              </Label>
              <Col sm={8}>
                <DatePicker
                  className="form-control"
                  id="transactionDate"
                  disabled={this.props.isProcessing}
                  onChange={this.props.onTransactionDateChange}
                  selected={
                    this.props.transactionDate &&
                    moment(this.props.transactionDate)
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="van" sm={4}>
                Virtual Account Number (VAN)
              </Label>
              <Col sm={8}>
                <Input
                  id="van"
                  type="text"
                  disabled={this.props.isProcessing}
                  onChange={this.props.onChange}
                  invalid={this.props.invalidVan()}
                  value={this.props.van || ""}
                />
                <FormFeedback>
                  Virtual Account Number (VAN) is required
                </FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="currency" sm={4}>
                Currency
              </Label>
              <Col sm={8}>
                <Input
                  id="currency"
                  type="text"
                  disabled={this.props.isProcessing}
                  onChange={this.props.onChange}
                  invalid={this.props.invalidCurrency()}
                  value={this.props.currency || ""}
                />
                <FormFeedback>Currency is required</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="amount" sm={4}>
                Amount
              </Label>
              <Col sm={8}>
                <Input
                  id="amount"
                  type="number"
                  disabled={this.props.isProcessing}
                  onChange={this.props.onChange}
                  invalid={this.props.invalidAmount()}
                  value={this.props.amount || ""}
                />
                <FormFeedback>Amount is required</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="bankReffNo" sm={4}>
                Bank Refference No.
              </Label>
              <Col sm={8}>
                <Input
                  id="bankReffNo"
                  type="text"
                  disabled={this.props.isProcessing}
                  onChange={this.props.onChange}
                  invalid={this.props.invalidBankReffNo()}
                />
                <FormFeedback>Amount is required</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Col sm={{ size: 8, offset: 4 }}>
                <Button
                  type="button"
                  onClick={this.props.onSubmit}
                  color="primary"
                  disabled={this.props.isProcessing}
                >
                  Submit
                </Button>
                <LinkContainer to={`/payments/${bank.code}`}>
                  <Button color="secondary" className="ml-2">
                    Cancel
                  </Button>
                </LinkContainer>
              </Col>
            </FormGroup>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

export default PaymentNew;
