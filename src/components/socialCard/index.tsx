import React from "react";
import { Link } from "react-router-dom";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import "./style.scss";
import { timeAgoFromDate } from "../../utils/functions/functions";

interface Iprops {
  data: ReadonlyArray<
    Readonly<{
      code?: string;
      creator_username?: string;
      deployed_at?: string;
      friendly_name?: string;
      image?: string;
      url?: string;
      munzeeText?: string;
      deployedText?: string;
      deployed_at_unix?: number;
      captureText?: string;
      avatar?: string;
      number_of_captures?: number;
    }>
  >;
  screenType: string;
}
const CustomToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const SocialCard = ({ data, screenType }: Iprops) => {
  return (
    <div className="socialCard-container">
      <ul id="socials-listing" className="list-inline">
        {data?.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item?.code || ""}>
                <img
                  className="social-image "
                  src={item?.image}
                  alt="img"
                ></img>
              </Link>
              {screenType === "social" ? (
                <p className="social-user">
                  Created by
                  <br />
                  <CustomToolTip title={item?.creator_username}>
                    <Link to={item?.url || ""}>
                      <img
                        className="square"
                        src={item?.avatar}
                        alt="img"
                      ></img>
                    </Link>
                  </CustomToolTip>
                </p>
              ) : (
                <p className="social-user">
                  <strong>{item?.friendly_name}</strong>
                  <br />
                  {`Captures: ${item?.number_of_captures}`}
                  <br />
                  {`Deployed ${timeAgoFromDate(item?.deployed_at || "")}`}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialCard;
