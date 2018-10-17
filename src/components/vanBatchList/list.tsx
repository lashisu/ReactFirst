import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Table } from "reactstrap";
import AsyncFetch from "../../_libs/asyncFetch";
import Config from "../../config";
import Paging from "../../controls/paging";
import Item from "./item";

interface IVanBatchListProps extends RouteComponentProps<any> {
  page: number;
  pageSize: number;
  totalItem: number;
  onDataUpdated: any;
  onPageChange: any;
}

interface IVanBatchListStates {
  error: any;
  isLoaded: boolean;
  items: any;
}

class VanBatchList extends React.Component<
  IVanBatchListProps,
  IVanBatchListStates
> {
  constructor(props: any) {
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
  };

  public okHandler = (data: any) => {
    this.setState(
      {
        isLoaded: true,
        items: data.items
      },
      this.props.onDataUpdated(data)
    );
  };

  public errorHandler = (error: any) => {
    this.setState({
      error,
      isLoaded: true
    });
  };

  public async LoadList(page: number, pageSize: number) {
    this.setState(
      { isLoaded: false },
      async () =>
        await AsyncFetch(
          `${Config.apiUrl}/vabatches?page=${page}&pageSize=${pageSize}`,
          this.okHandler,
          this.notOkHandler,
          this.errorHandler
        )
    );
  }

  public async componentWillReceiveProps(a: any) {
    if (a.page !== this.props.page || a.pageSize !== this.props.pageSize) {
      await this.LoadList(a.page, a.pageSize);
    }
  }

  public async componentDidMount() {
    await this.LoadList(this.props.page, this.props.pageSize);
  }

  public render() {
    const { items, error, isLoaded } = this.state;
    const { page, pageSize, totalItem } = this.props;
    if (error != null) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Table responsive={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Batch Date</th>
                <th>Requested</th>
                <th>Requestor</th>
                <th className="text-center">Bank</th>
                <th className="text-center">Currency</th>
                <th className="text-right">Requested</th>
                <th className="text-right">Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item: any) => (
                  <Item item={item} key={item.batchNumber} />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No data
                  </td>
                </tr>
              )}
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
}

export default withRouter(VanBatchList);
