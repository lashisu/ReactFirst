import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Row, Table } from "reactstrap";
import Alert from "../../containers/alert";
import PageHeader from "../../controls/pageHeader";
import Paging from "../../controls/paging";
import Item from "./item";

interface IPaymentTableProps {
  bank: any;
  error: string;
  items: any;
  onPageChange: any;
  page: number;
  pageSize: number;
  totalItem: number;
}

class PaymentTable extends React.Component<IPaymentTableProps, {}> {
  public render() {
    const { bank, items, page, pageSize, totalItem } = this.props;

    return (
      <React.Fragment>
        <PageHeader>Payments</PageHeader>
        <Alert />
        {bank && (
          <Row className="mb-3">
            <Col sm={12} className={"text-right"}>
              <LinkContainer to={`/payments/${bank.code}/new`}>
                <Button color="primary">New Payment</Button>
              </LinkContainer>
            </Col>
          </Row>
        )}

        <Table responsive={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>Payment Date</th>
              <th>VAN</th>
              <th>Curr</th>
              <th>Amount</th>
              <th>Bank Reff</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item: any) => <Item key={item.id} item={item} />)}
          </tbody>
        </Table>
        <Paging
          page={page}
          pageSize={pageSize}
          totalItem={totalItem}
          onPageClicked={this.props.onPageChange}
        />
      </React.Fragment>
    );
  }
}

export default PaymentTable;
