import * as React from "react";
import { PaginationItem, PaginationLink } from "reactstrap";

interface IPagingItemProps {
  active: boolean;
  page: number;
  onClick: any;
}

class PagingItem extends React.Component<IPagingItemProps, {}> {
  public onClick = () => {
    this.props.onClick(this.props.page);
  };

  public render() {
    return (
      <PaginationItem active={this.props.active}>
        <PaginationLink onClick={this.onClick}>
          {this.props.page}
        </PaginationLink>
      </PaginationItem>
    );
  }
}

export default PagingItem;
