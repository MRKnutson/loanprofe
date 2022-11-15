import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { OperationSelector } from "../helpers/Constants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import filterFactory, {
  numberFilter,
  textFilter,
} from "react-bootstrap-table2-filter";

const PaginatedTable = ({ records, deleteRecord }) => {
  const data = records.map((record) => {
    return {
      ID: record.ID,
      operation: OperationSelector[record.operationid],
      response: record.operationresponse,
      balance: `$${record.userbalance}`,
      button: (
        <Button variant="danger" onClick={() => deleteRecord(record)}>
          Delete
        </Button>
      ),
    };
  });

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  const filterfactory = filterFactory({});

  const columns = [
    {
      dataField: "ID",
      text: "Id",
      sort: true,
      style: { minWidth: "25%" },
      headerStyle: (colum, colIndex) => {
        return { width: "20%", textAlign: "center" };
      },
      align: "center",
      filter: numberFilter(),
    },
    {
      dataField: "operation",
      text: "Operation",
      sort: true,
      filter: textFilter(),
      headerStyle: (colum, colIndex) => {
        return { width: "15%" };
      },
    },
    {
      dataField: "response",
      text: "Response",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { minWidth: "30%" };
      },
      // style: { display: "inline-flex" },
      filter: textFilter(),
    },
    {
      dataField: "balance",
      text: "User Balance",
      headerStyle: (colum, colindex) => {
        return { width: "15%" };
      },
      sort: true,
    },
    {
      dataField: "button",
      text: "Delete Record",
      headerStyle: (colum, colIndex) => {
        return { width: "15%", textAlign: "center" };
      },
      align: "center",
    },
  ];
  return (
    <div>
      <BootstrapTable
        striped
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        pagination={pagination}
        filter={filterfactory}
        filterPosition="bottom"
      />
    </div>
  );
};

export default PaginatedTable;
