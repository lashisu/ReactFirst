import * as React from "react";

interface IItemProps {
  item: any;
}

class Item extends React.Component<IItemProps, {}> {
  public render() {
    const { item } = this.props;
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.transactionDate}</td>
        <td>{item.virtualAccountNumber}</td>
        <td>{item.currency}</td>
        <td>{item.amount}</td>
        <td>{item.bankReffNo}</td>
        <td>{item.matchedStatus}</td>
      </tr>
    );
  }
}

export default Item;
