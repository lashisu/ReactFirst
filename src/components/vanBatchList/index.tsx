import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import PageHeader from "../../controls/pageHeader";
import List from "./list";

interface IVanMappingListProps extends RouteComponentProps<any> {}

interface IVanMappingListStates {
  error: any;
  isLoaded: boolean;
  items: any;
  page: number;
  pageSize: number;
  totalItem: number;
}

class VanMappingList extends React.Component<
  IVanMappingListProps,
  IVanMappingListStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      page: 1,
      pageSize: 10,
      totalItem: 0
    };
  }

  public onPageChange = (e: number) => {
    if (this.state.page !== e) {
      this.setState({
        page: e
      });
    }
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

  public render() {
    return (
      <React.Fragment>
        <PageHeader>VAN Batch Files</PageHeader>
        <Row className="mb-3">
          <Col sm={12} className={"text-right"}>
            <LinkContainer to={`/van/batches/new`}>
              <Button color="primary">Generate New Batch</Button>
            </LinkContainer>
          </Col>
        </Row>
        <List
          page={this.state.page}
          pageSize={this.state.pageSize}
          totalItem={this.state.totalItem}
          onPageChange={this.onPageChange}
          onDataUpdated={this.onDataUpdated}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(VanMappingList);
