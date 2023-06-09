import React from "react";
import { Avatar } from "@mui/material";
import "./style.scss";

type Data = Readonly<{
  imageUrl: string;
  username: string;
  score: string;
  rank: string;
}>;

interface Props {
  title: string;
  imgDimension?: number;
  screen?: string;
  data: ReadonlyArray<Data>;
  showIcon?: boolean;
}

const LeaderboardTable = ({
  title,
  data,
  showIcon,
  imgDimension,
  screen,
}: Props): JSX.Element => {
  return (
    <div className="leaderboard-table-container">
      <div className="board-title">
        <p>{title}</p>
        {showIcon && <i className="fa fa-exchange"></i>}
      </div>
      <table>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={`${title}#${item.rank}${index}`}>
                <td className="rank">{item.rank}</td>
                <td className={`user-anchor ${screen ? screen : ""}`}>
                  <Avatar
                    src={item.imageUrl}
                    alt=""
                    variant="square"
                    sx={{
                      width: imgDimension || 30,
                      height: imgDimension || 30,
                    }}
                  />
                  <p>{item.username}</p>
                </td>
                <td className="points">{item.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
