import * as React from "react";

let fileReader: any;

class PaymentNew extends React.Component {
  public handleFileRead = () => {
    const content = fileReader.result;
    console.log(content);
  };

  public handleFileChosen = (e: any) => {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(e.target.files[0]);
  };

  public render() {
    return (
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".txt"
        onChange={this.handleFileChosen}
      />
    );
  }
}

export default PaymentNew;
