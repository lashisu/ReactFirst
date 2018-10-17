import * as React from "react";
import { Col, Row, Table } from "reactstrap";
import Alert from "../../containers/alert";
import PageHeader from "../../controls/pageHeader";
import Paging from "../../controls/paging";
import Item from "./item";

interface IhandleFileChosenProps {
  handleFileChosen: any;
  isProcessing: boolean;
  items: any;
  onPageChange: any;
  page: number;
  pageSize: number;
  totalItem: number;
}

class VanActivationTable extends React.Component<IhandleFileChosenProps, {}> {
  public render() {
    const { items, page, pageSize, totalItem } = this.props;
    return (
      <React.Fragment>
        <PageHeader>Activation List</PageHeader>
        <Alert />
        <Row className="mb-3">
          <Col sm={12} className={"text-right"}>
            <input
              type="file"
              id="file"
              className="input-file sm-3"
              accept=".txt"
              disabled={this.props.isProcessing}
              onChange={this.props.handleFileChosen}
            />
          </Col>
        </Row>
        <Table responsive={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>File Name</th>
              <th>Upload Time</th>
              <th>Count</th>
              <th>Accepted</th>
              <th>Rejected</th>
              <th>Activated</th>
              <th />
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

export default VanActivationTable;
