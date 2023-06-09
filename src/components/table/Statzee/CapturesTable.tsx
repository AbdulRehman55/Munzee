import React from "react";
import TableComponent from "../../../screens/playerDay/TableComponent";

type MunzeeIcons = ReadonlyArray<
  Readonly<{
    icon: string;
    amount: number;
  }>
>;

type TableData = ReadonlyArray<
  Readonly<{
    time: string;
    munzee: string;
    pin: string;
    link: string;
    byUsername: string;
    byLink: string;
    points: number;
  }>
>;

const CapturesTable = (props: {
  munzeeIcons: MunzeeIcons;
  tableData: TableData;
}): JSX.Element => {
  const columns = ["time", "munzee", "", "points"];

  return (
    <TableComponent
      munzeeIcons={props.munzeeIcons}
      tableData={props.tableData}
      columns={columns}
    />
  );
};

export default CapturesTable;
