import React from "react";
import "./style.scss";
import { Box } from "@mui/material";

type munzeeIconsType = Readonly<{
  icon: string;
  amount: number;
}>;

type tableDataType = Readonly<{
  time: string;
  munzee: string;
  pin: string;
  link: string;
  byUsername: string;
  byLink: string;
  points: number;
}>;
interface iProps {
  munzeeIcons: ReadonlyArray<munzeeIconsType>;
  tableData: ReadonlyArray<tableDataType>;
  columns: ReadonlyArray<string>;
}

interface ITableHeadingProps {
  columns: ReadonlyArray<string>;
}

const TableHeading = ({ columns }: ITableHeadingProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};
const TableComponent = ({
  munzeeIcons,
  tableData,
  columns,
}: iProps): JSX.Element => {
  const getMunzeeIcons = () => {
    return munzeeIcons.map((item) => {
      return (
        <Box>
          <img src={item.icon} />
          <span>{item.amount}</span>
        </Box>
      );
    });
  };

  const getTableRows = () => {
    return tableData.map((item) => {
      return (
        <tr>
          <td>{item.time}</td>
          <td>
            <img src={item.pin} />
            <a href={item.link}>{item.munzee}</a>
          </td>
          <td>
            <a href={item.byLink}>{item.byUsername}</a>
          </td>
          <td>{item.points}</td>
        </tr>
      );
    });
  };

  return (
    <Box className="captures-table-wrapper">
      <div className="munzee-icons">{getMunzeeIcons()}</div>
      <table>
        <TableHeading columns={columns} />
        <thead>{getTableRows()}</thead>
      </table>
    </Box>
  );
};

export default TableComponent;
