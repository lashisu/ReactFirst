import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as moment from "moment";
import * as React from "react";
import AsyncFetch from "../../_libs/asyncFetch";
import Config from "../../config";

interface IItemProps {
  item: any;
}

class Item extends React.Component<IItemProps, {}> {
  public notOkHandler = (result: any) => {
    this.setState({
      error: {
        message: `API error: ${result.statusText} (${result.status})`
      },
      isLoaded: true
    });
  };

  public okHandler = (data: any) => {
    const element = document.createElement("a");
    const file = new Blob([data.fileContents.join("\r\n")], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = data.fileName + ".txt";
    element.click();
  };

  public errorHandler = (error: any) => {
    this.setState({
      error,
      isLoaded: true
    });
  };

  public downloadTxtFile = () => {
    console.log(this);
    const { item } = this.props;
    AsyncFetch(
      `${Config.apiUrl}/vabatches/${item.bankCode}/${item.batchNumber}`,
      this.okHandler,
      this.notOkHandler,
      this.errorHandler
    );
  };

  public render() {
    const { item } = this.props;

    return (
      <tr key={item.batchNumber}>
        <td>{item.batchNumber}</td>
        <td>{moment(item.batchDate).format("DD MMM YYYY")}</td>
        <td>{moment(item.createdOn).format("DD MMM YYYY, HH:mm:ss")}</td>
        <td>{item.createdBy}</td>
        <td className="text-center">{item.bankCode}</td>
        <td className="text-center">{item.currency}</td>
        <td className="text-right">{item.countRequested.toLocaleString()}</td>
        <td className="text-right">{item.countCreated.toLocaleString()}</td>
        <td className="text-center">
          <div onClick={this.downloadTxtFile} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon="file" />
          </div>
        </td>
      </tr>
    );
  }
}

export default Item;
