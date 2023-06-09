import React from "react";
import { Link } from "react-router-dom";
import { timeAgoFromDate } from "../../../utils/functions/functions";
import "./style.scss";

interface ITableHeadingProps {
  columns: string[];
}
interface Iprops {
  data?: {
    awarded_at: string;
    points: string;
    notes: string;
    new_username: string;
    new_user_id: string;
  }[];
  columns: string[];
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

const ReferralTable = ({ data, columns }: Iprops) => {
  return (
    <div className="referral-table-container">
      <table className="table">
        <TableHeading columns={columns} />
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.points}</td>
              <td>
                <Link to={`/r${item.new_username}/`} className="link">
                  {item.notes}
                </Link>
              </td>
              <td>{timeAgoFromDate(item.awarded_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralTable;
