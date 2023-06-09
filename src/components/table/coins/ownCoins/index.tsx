import { Link } from "react-router-dom";
import { timeAgoFromDate } from "../../../../utils/functions/functions";
import { getAvatarUrl } from "../../../../munzee-client/utils";
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

interface OwnCoinsData {
  logo?: string;
  type_name?: string;
  code?: string;
  total_visits?: number;
  name: string;
}

interface RequestCoinsData {
  discovered_at: string;
  name: string;
  type_logo?: string;
  user_id: string | number;
  username: string;
}
interface Iprops {
  columns: string[];
  icons?: boolean;
  ownCoins?: readonly OwnCoinsData[];
  requestCoins?: readonly RequestCoinsData[];
}

const OwnCoinsTable = ({ columns, icons, ownCoins, requestCoins }: Iprops) => {
  return (
    <div className="OwnCoins-table-container">
      <table className="table">
        <TableHeading columns={columns} />
        <tbody>
          {ownCoins?.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="img-text-wrapper">
                  <Link to="#">
                    <img className="user-photo" src={item.logo} alt="" />
                  </Link>

                  <Link to="#" className="link">
                    {item.name}
                  </Link>
                </div>
              </td>
              <td>{item.type_name}</td>
              <td>{item.code}</td>
              <td>
                <div className="icons-wrapper">
                  <td>{item.total_visits}</td>
                  {icons && (
                    <div className="icons">
                      <i className="fa fa-check-circle"></i>
                      <i className="fa fa-times-circle"></i>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {requestCoins?.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="img-text-wrapper">
                  <Link to="#">
                    <img className="user-photo" src={item.type_logo} alt="" />
                  </Link>

                  <Link to="#" className="link">
                    {item.name}
                  </Link>
                </div>
              </td>
              <td>
                <div className="img-text-wrapper">
                  <Link to="#">
                    <img
                      className="user-photo"
                      src={getAvatarUrl(+Number(item.user_id))}
                      alt=""
                    />
                  </Link>

                  <Link to={`/m/${item?.username}`} className="link">
                    {item.username}
                  </Link>
                </div>
              </td>
              <td>
                <div className="icons-wrapper">
                  <td>{timeAgoFromDate(item.discovered_at || "")}</td>
                  <div className="icons">
                    <i className="fa fa-check-circle"></i>
                    <i className="fa fa-times-circle"></i>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnCoinsTable;
