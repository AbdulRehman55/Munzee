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

type LeaderboardEntry = Readonly<{
  rank: string;
  username: string;
  imageUrl: string;
  score: string;
  by: string;
  miles: string;
}>;

interface Iprops {
  data: ReadonlyArray<LeaderboardEntry>;
  columns: string[];
}
const RoversTable = ({ data, columns }: Iprops): JSX.Element => {
  return (
    <div className="rovers-table-container">
      <table className="table">
        <TableHeading columns={columns} />
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.rank}</td>
              <td key={index}>
                <a>
                  <img
                    className="user-photo"
                    src={item.imageUrl}
                    alt="Rover Photo"
                  />
                </a>
                <span className="rover-info">
                  <a>{item.username}</a>
                  <br />
                  by
                  <a>{` ${item.by}`}</a>
                </span>
                <br />
              </td>
              <td>{item.miles}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RoversTable;
