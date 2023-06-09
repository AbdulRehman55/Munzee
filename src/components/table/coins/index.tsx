import { getAvatarUrl } from "../../../munzee-client/utils";
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
interface Iprops {
  columns: string[];
  coins?: {
    coin_id: string;
    visited_at: string;
    user_id: string;
    name: string;
    type_logo: string;
    type_name: string;
    username: string;
  }[];
  coinTypes?: {
    number: string;
    type_logo: string;
    type_name: string;
  }[];
}

const CoinsTable = ({ coinTypes, coins, columns }: Iprops) => {
  console.log(coinTypes, "cioasinjiaij");
  return (
    <div className="coins-table-container">
      <table className="table">
        <TableHeading columns={columns} />

        <tbody>
          {coins?.map((item, index) => (
            <tr key={index}>
              <td>
                <img className="user-photo" src={item.type_logo} alt="" />
                <a href="/c/12655/">{item.name}</a>
              </td>
              <td>
                <a href={`/m/${item?.username}/`}>
                  <img
                    className="user-photo"
                    src={getAvatarUrl(+Number(item.user_id))}
                    alt=""
                  />
                  {item.username}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          {coinTypes?.map((item, index) => (
            <tr key={index}>
              <td>
                <img className="user-photo" src={item.type_logo} alt="" />
                {item.type_name}
              </td>
              <td>{item.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsTable;
