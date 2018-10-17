import * as React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PagingItem from "./pagingItem";

interface IPagingProps {
  page: number;
  pageSize: number;
  totalItem: number;
  onPageClicked: any;
}

class Paging extends React.Component<IPagingProps, {}> {
  public firstPageClicked = () => {
    this.props.onPageClicked(1);
  };

  public prevPageClicked = () => {
    this.props.onPageClicked(this.props.page - 1);
  };

  public nextPageClicked = () => {
    this.props.onPageClicked(this.props.page + 1);
  };

  public lastPageClicked = () => {
    this.props.onPageClicked(
      Math.ceil(this.props.totalItem / this.props.pageSize)
    );
  };

  public render() {
    const { page, pageSize, totalItem } = this.props;
    const totalPage = Math.ceil(totalItem / pageSize);
    const items = [];

    for (let idx: number = 1; idx <= totalPage; idx++) {
      items.push(
        <PagingItem
          active={idx === page}
          onClick={this.props.onPageClicked}
          page={idx}
          key={idx}
        />
      );
    }
    return (
      <React.Fragment>
        {this.props.totalItem > 0 && (
          <Pagination>
            <PaginationItem disabled={this.props.page === 1}>
              <PaginationLink previous={true} onClick={this.prevPageClicked} />
            </PaginationItem>
            {items}
            <PaginationItem disabled={this.props.page === totalPage}>
              <PaginationLink next={true} onClick={this.nextPageClicked} />
            </PaginationItem>
          </Pagination>
        )}
      </React.Fragment>
    );
  }
}

export default Paging;
