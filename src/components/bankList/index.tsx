import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Alert, Button, Table } from "reactstrap";

import PageHeader from "../../controls/pageHeader";

interface IBankListProps {
  banks: any;
  error: any;
  isLoaded: boolean;
}

class BankList extends React.Component<IBankListProps, {}> {
  public render() {
    const { banks, error, isLoaded } = this.props;
    if (error || "" !== "") {
      return (
        <Alert color="danger" className="error">
          Error: {error.message}
        </Alert>
      );
    } else if (!isLoaded) {
      return <div className="loading">Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <PageHeader>Bank List</PageHeader>
          <Table responsive={true} className="bank-list">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>A/C No</th>
                <th>A/C Name</th>
                <th>CMS Client Id</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {banks.map((bank: any) => (
                <tr key={bank.id} className="bank-item">
                  <td>{bank.id}</td>
                  <td>{bank.code}</td>
                  <td>{bank.name}</td>
                  <td>{bank.companyAccountNo}</td>
                  <td>{bank.companyAccountName}</td>
                  <td>{bank.cmsClientId}</td>
                  <td>
                    <LinkContainer to={"/banks/" + bank.id + "/edit"}>
                      <Button color="primary" size="sm">
                        Edit
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      );
    }
  }
}

export default BankList;
