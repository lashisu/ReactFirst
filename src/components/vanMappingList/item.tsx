import * as moment from "moment";
import * as React from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

interface IItemProps {
  item: any;
}

class Item extends React.Component<IItemProps, {}> {
  public render() {
    const { item } = this.props;

    return (
      <React.Fragment>
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{moment(item.requestedOn).format("DD MMM YYYY, HH:mm:ss")}</td>
          <td>{item.requestedBy}</td>
          <td className="text-center">{item.bankCode}</td>
          <td className="text-center">{item.prefix}</td>
          <td className="text-center">{item.digit}</td>
          <td className="text-center">{item.firstNumber}</td>
          <td className="text-center">{item.lastNumber}</td>
          <td className="text-center">
            {item.isSuccess ? "Success" : <div id="status">Failed</div>}
          </td>
        </tr>
        {!item.isSuccess && (
          <Popover placement="left" target="status">
            <PopoverHeader>Failed</PopoverHeader>
            <PopoverBody>{item.errorMessage}</PopoverBody>
          </Popover>
        )}
      </React.Fragment>
    );
  }
}

export default Item;
