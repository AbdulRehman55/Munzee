import { Link } from "react-router-dom";
import { timeAgoFromDate } from "../../../utils/functions/functions";
import { Rover } from "../../../munzee-backend/types";
import "./style.scss";

interface ITableHeadingProps {
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

interface data {
  global_rank?: string;
  score?: string;
  level?: number;
  total_miles?: number | string;
  log_at?: any;
  logo?: string;
  name?: string;
  username?: string;
  miles?: string;
  rover_id?: string;
}

interface Iprops {
  data?: readonly data[];
  ownData?: ReadonlyArray<Rover>;
  columns: string[];
}

const KennelTable = ({ data, columns, ownData }: Iprops) => {
  console.log(data)
  return (
    <div className="kennel-table-container">
      <table className="table">
        <TableHeading columns={columns} />
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/r${item.rover_id}/`}>
                  <img className="user-photo" src={item.logo} alt="" />
                </Link>
                <Link to={`/r${item.rover_id}/`} className="link">
                  {item.name}
                </Link>
                <br />
                by
                <Link to={`/m${item.username}/`} className="link">{` ${item.username}`}</Link>
                <br />
                {item.log_at && (
                  <p>{`transported ${timeAgoFromDate(item.log_at || "")}`}</p>
                )}
              </td>
              {item.miles && <td>{item.miles?.split(".")[0]}</td>}
              <td>{item.total_miles?.toString().split(".")[0]}</td>
              <td>{item.score}</td>
              <td>{item.level}</td>
              <td>{`#${item.global_rank}`}</td>
            </tr>
          ))}
          {ownData?.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/r${item.rover_id}/`}>
                  <img className="user-photo" src={item.logo} alt="" />
                </Link>
                <Link to={`/r${item.rover_id}/`} className="link">
                  {item.name}
                </Link>
                <br />
                {item?.goal ? (
                  <span className="free">
                    {item?.goal?.free_to_roam ? "free to roam" : ""}
                  </span>
                ) : (
                  <span className="no-goal">no goal set</span>
                )}
              </td>
              <td>{item.total_miles?.toString().split(".")[0]}</td>
              <td>{item.score}</td>
              <td>{item.level_info.level}</td>
              <td>{`#${item.global_rank}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KennelTable;
