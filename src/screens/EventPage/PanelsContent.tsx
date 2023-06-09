import React from "react";
import "./styles.scss";
import {Box, Link, Typography} from "@mui/material";
import { PageTitle } from "../../components";
import { capturesList } from "./tabsData";
import { Flag } from "@mui/icons-material";
import staticMap from "../../assets/images/staticmap.png";
import userPic from "../../assets/images/ua4zr5.png";
import { closestMunzeesList } from "./tabsData";

interface captureItemProps {
    image: string;
    name: string;
    timeAgo: string;
    points: number;
}
const CaptureItem = ({ image, name, timeAgo, points }: captureItemProps) => {
  return (
      <div className="capture-item">
          <div className="info-block">
              <img src={image} alt="User Avatar" />
              <div className="info-wrapper">
                  <span> <Flag />{name}</span>
                  <span>{timeAgo}</span>
              </div>
          </div>
          <div className="right-side">
              <div className="points-block">
                  <span>{points}</span>
                  <span>points</span>
              </div>
          </div>
      </div>
  )
};

const EventDetails = () => {
    const getClosestMunzees = () => {
        return closestMunzeesList.map(item => {
            return (
                <Link className="event-item" href={item.link}>
                    <img src={item.icon}/>
                    <span>{item.title}</span>
                </Link>
            )
        })
    };

    return (
        <Box className="event-details">
            <PageTitle title="Not captured"/>
            <Link href="/map/" className="map-wrapper">
                <img src={staticMap} alt='Static map'/>
            </Link>
            <div className="user-info">
                <img src={userPic}></img>
                <span>FTC by</span>
                <Link href="/m/id/">Rovert2</Link>
            </div>
            <PageTitle title="Closest munzees"/>
            <div className="closest-munzees-list">
                {getClosestMunzees()}
            </div>
            <PageTitle title="Share"/>
        </Box>
    )
}
export const CapturesPanel = () => {

    const getCapturesList = () => {
        return capturesList.map(item => {
            return <CaptureItem image={item.image} name={item.name} timeAgo={item.timeAgo} points={item.points} />
        })
    };

    return (
        <Box className="panels-wrapper">
            <Box className="captures-panel">
                <PageTitle title="Captures"/>
                <div className="captures-list">
                    {getCapturesList()}
                </div>
            </Box>
            <EventDetails />
        </Box>

    )
};

export const EntryPanel = () => {
    return (
        <Box className="panels-wrapper">
            <Box className="entry-panel">
                <PageTitle title="Entry"/>
                <form></form>
            </Box>
            <EventDetails />
        </Box>
    )
};

export const NotesPanel = () => {
    return (
        <Box className="panels-wrapper">
            <Box className="notes-panel">
                <PageTitle title="Munzee Notes"/>
                <Typography>Some notes</Typography>
            </Box>
            <EventDetails />
        </Box>
    )
};