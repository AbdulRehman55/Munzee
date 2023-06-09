import React from "react";
import "./style.scss";

interface Data {
  imageUrl: string;
  username: string;
  score: string;
  rank: string;
  player: string;
}

interface Props {
  title: string;
  data: ReadonlyArray<Data>;
}

const MunzeeTable = ({ title, data }: Props): JSX.Element => {
  return (
    <div className="munzee-table-wrapper">
      <div className="board-title">{title}</div>
      <table>
        <tbody>
          {data?.map((item) => {
            return (
              <tr>
                <td className="rank">{item.rank}</td>
                <td className="username">
                  <a>
                    <img className="pin" src={item.imageUrl} />
                  </a>
                  <a> {item.username}</a>
                </td>
                <td className="social-owner">
                  by <a> {item.player}</a>
                </td>
                <td className="leaderboard-captures">{item.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MunzeeTable;
