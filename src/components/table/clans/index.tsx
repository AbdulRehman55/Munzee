import "./style.scss";

type ClanLeaderboardEntry = Readonly<{
  rank: string;
  name: string;
  imageUrl: string;
  totalPoints: string;
  levelReached: string;
}>;

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
  data: ReadonlyArray<ClanLeaderboardEntry>;
  columns: string[];
  title: string;
}

const ClanTable = ({ data, columns, title }: Iprops) => {
  return (
    <div className="clan-table-container">
      <div className="board-title">{title}</div>
      <div className="table-wrapper">
        <table className="table">
          <TableHeading columns={columns} />
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
                <td key={index}>
                  <img className="user-photo" src={item.imageUrl} alt="photo" />
                </td>
                <td>{item.name}</td>
                <td>{item.totalPoints}</td>
                <td>{item.levelReached}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClanTable;
