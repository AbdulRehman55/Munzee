import React from "react";
import "./styles.scss";
import { Box, Container, Tooltip, Typography, Link } from "@mui/material";
import { eventIndicatorLocales as e } from "./eventIndicatorLocales";
import { Alert } from "../../components";
import { timeAgoFromDate } from "../../utils/functions/functions";
import { ClientContext } from "../../context/ClientContext";

interface dayActivityProps {
  route: string;
  day: string;
  deploys: number;
  captures: number;
}
const DayActivity = ({ route, day, deploys, captures }: dayActivityProps) => {
  const tooltipTitle = `${day} | ${deploys} deployed | ${captures} captured`;
  return (
    <Tooltip title={tooltipTitle}>
      <Link
        className={`day-activity ${deploys ? " deployed " : ""} ${
          captures ? " captured " : ""
        }`}
        href={`/player/day/${route}`}
      ></Link>
    </Tooltip>
  );
};

interface panelItemProps {
  icon: string;
  title: string;
  timeAgo: string;
  points: number;
  link: string;
  type: string;
}

const PanelItem = ({
  icon,
  title,
  timeAgo,
  points,
  link,
  type,
}: panelItemProps) => {
  return (
    <div className="panel-item">
      <div className="info">
        <Link href={link} className="icon">
          <img src={icon} alt={title} />
        </Link>
        <Typography className="text">
          <Link href={link}>{title}</Link>
          <span>{timeAgoFromDate(timeAgo)}</span>
        </Typography>
      </div>
      <Link href={link} className="points">
        {points}
        <span>{type}</span>
      </Link>
    </div>
  );
};

interface eventIndicatorProps {
  daysActivityData: dayActivityProps[];
  leftPanelItemsData: panelItemProps[];
  rightPanelItemsData: panelItemProps[];
}

const EventIndicator = ({
  daysActivityData,
  leftPanelItemsData,
  rightPanelItemsData,
}: eventIndicatorProps): JSX.Element => {
  const { user } = React.useContext(ClientContext);
  const getDays = () => {
    return daysActivityData.map((item) => {
      return (
        <DayActivity
          route={item.route}
          day={item.day}
          captures={item.captures}
          deploys={item.deploys}
        />
      );
    });
  };

  const getPanelItems = (isLeftPanel = false) => {
    return (isLeftPanel ? leftPanelItemsData : rightPanelItemsData).map(
      (item) => {
        return (
          <PanelItem
            icon={item.icon}
            title={item.title}
            timeAgo={item.timeAgo}
            points={item.points}
            link={item.link}
            type={item.type}
          />
        );
      }
    );
  };

  return (
    <Box id="event-indicator-page">
      {user && (
        <Container className="event-indicator-wrapper">
          <Box className="recent-streak-activity">
            <h4>{e.pageTitle}</h4>
            <div className="days">{getDays()}</div>
            <Typography className="info">
              <p>{e.activityDesc}</p>
              <Typography>
                <span className="color-indicator orange"></span>
                <span>{e.deployIndicator}</span>
                <span className="color-indicator green"></span>
                <span>{e.captureIndicator}</span>
                <span className="color-indicator orange-green"></span>
                <span>{e.deployCaptureIndicator}</span>
              </Typography>
            </Typography>
          </Box>
        </Container>
      )}
      <Container className="panels-wrapper">
        <div className="panel deploymens">
          <div className="panel-heading">{e.popularDeployments}</div>
          <div className="panel-content">
            {leftPanelItemsData.length ? (
              getPanelItems(true)
            ) : (
              <Alert align="center" type="error">
                {e.noDeploysError}
              </Alert>
            )}
          </div>
        </div>
        <div className="panel captures">
          <div className="panel-heading">{e.recentCaptures}</div>
          <div className="panel-content">
            {rightPanelItemsData.length ? (
              getPanelItems(false)
            ) : (
              <Alert align="center" type="error">
                {e.noCapturesError}
              </Alert>
            )}
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default EventIndicator;
