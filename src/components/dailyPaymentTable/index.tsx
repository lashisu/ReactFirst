import * as React from "react";
import PageHeader from "../../controls/pageHeader";

interface IDailyPaymentTableProps {
  handleFileChosen: any;
}

class DailyPaymentTable extends React.Component<IDailyPaymentTableProps, {}> {
  public render() {
    return (
      <React.Fragment>
        <PageHeader>Import Daily Payment</PageHeader>
        <input
          type="file"
          id="file"
          className="input-file"
          accept=".qif"
          onChange={this.props.handleFileChosen}
        />
      </React.Fragment>
    );
  }
}

export default DailyPaymentTable;
