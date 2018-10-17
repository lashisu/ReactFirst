import * as React from "react";
import { Input } from "reactstrap";
import AsyncFetch from "../../_libs/asyncFetch";
import Config from "../../config";

interface IBankDropdownProps {
  id: string;
  invalid: boolean;
  disabled: boolean;
  onChange: any;
}

interface IBankDropdownStates {
  error: any;
  isLoaded: boolean;
  items: any;
}

class BankDropdown extends React.Component<
  IBankDropdownProps,
  IBankDropdownStates
> {
  constructor(props: IBankDropdownProps) {
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
    this.setState({
      isLoaded: true,
      items: data.banks
    });
  };

  public errorHandler = (error: any) => {
    this.setState({
      error,
      isLoaded: true
    });
  };

  public async componentDidMount() {
    await AsyncFetch(
      `${Config.apiUrl}/banks`,
      this.okHandler,
      this.notOkHandler,
      this.errorHandler
    );
  }

  public render() {
    return (
      <Input
        type="select"
        id={this.props.id}
        invalid={this.props.invalid}
        disabled={!this.state.isLoaded || this.props.disabled}
        onChange={this.props.onChange}
      >
        {!this.state.isLoaded && <option>loading ...</option>}
        {this.state.items && <option value="" />}
        {this.state.items &&
          this.state.items.map((item: any) => (
            <option key={item.id}>{item.code}</option>
          ))}
      </Input>
    );
  }
}

export default BankDropdown;
