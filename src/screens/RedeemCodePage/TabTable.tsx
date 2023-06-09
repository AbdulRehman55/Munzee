import React from "react";
import "./styles.scss";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { PageTitle } from "../../components";
import { redeemCodeLocales as r } from "./redeemCodeLocales";
import RowComponent, { Item } from "./RowComponent";

export type { Item };

type tabProps = Readonly<{
  title: string;
  tableData: ReadonlyArray<Item>;
  onRedeem: (id: string, quantity: number) => void;
}>;

const TabTable = ({ title, tableData, onRedeem }: tabProps): JSX.Element => {
  if (tableData.length) {
    return (
      <>
        <PageTitle title={title} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{r.table_column_1}</TableCell>
                <TableCell>{r.table_column_2}</TableCell>
                <TableCell>{r.table_column_3}</TableCell>
                <TableCell>{r.table_column_4}</TableCell>
                <TableCell align="right">{r.table_column_5}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <RowComponent rowData={row} onRedeem={onRedeem} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else {
    return <div>No available items</div>;
  }
};

export default TabTable;
