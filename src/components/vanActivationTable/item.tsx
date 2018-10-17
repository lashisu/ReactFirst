import * as moment from "moment";
import * as React from "react";
import { Tooltip } from "reactstrap";

interface IItemProps {
  item: any;
}

interface IItemStates {
  tooltipOpen: boolean;
}

class Item extends React.Component<IItemProps, IItemStates> {
  constructor(props: IItemProps) {
    super(props);

    this.state = {
      tooltipOpen: false
    };
  }

  public toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  public render() {
    const { item } = this.props;
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.fileName}</td>
        <td>{moment(item.createdOn).format("DD MMM YYYY, HH:mm:ss")}</td>
        <td>{item.totalCount}</td>
        <td>{item.totalAccepted}</td>
        <td>{item.totalRejected}</td>
        <td>{item.totalActivated}</td>
        <td>
          {item.isSuccess ? (
            "OK"
          ) : (
            <React.Fragment>
              <p>
                <span id="errorTooltip" className="error">
                  FAILED
                </span>
              </p>
              <Tooltip
                placement="right"
                isOpen={this.state.tooltipOpen}
                target="errorTooltip"
                toggle={this.toggleTooltip}
              >
                {item.errorMessage}
              </Tooltip>
            </React.Fragment>
          )}
        </td>
      </tr>
    );
  }
}

export default Item;
