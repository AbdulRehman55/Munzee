import React from "react";
import { Grid } from "@mui/material";
import "./styles.scss";
import { Button, Container, DetailCard, TitleBar } from "../../components";
import { useNavigate } from "react-router-dom";

const section1 = [
  {
    iconClass: "fa fa-search",
    title: "Search",
    details:
      "Use the map to find munzees hidden nearby or search for munzees that are at your favorite destinations.",
  },
  {
    iconClass: "fa fa-location-arrow",
    title: "Locate",
    details:
      "Select the munzee of your choice and let the GPS show you the way. Follow the map and notes to pinpoint the exact location.",
  },
  {
    iconClass: "fa fa-camera-retro",
    title: "Capture",
    details:
      "Scan the QR code with your smart phone camera and you’re done. You just captured your first munzee!",
  },
];

const section2 = [
  {
    iconClass: "fa fa-qrcode",
    title: "Create",
    details:
      "Create from your home page and print your own munzees or purchase weatherproof pre-made munzee stickers from our store",
    link: "https://store.freezetag.com/",
    linkText: "Visit Store",
  },
  {
    iconClass: "fa fa-map-marker",
    title: "Place",
    details:
      "Be creative! Find a great location to hide your munzee. There is virtually no limit to where you can place your munzee in the world.",
    link: "https://www.munzee.com/map",
    linkText: "View Map",
  },
  {
    iconClass: "fa fa-print",
    title: "Deploy",
    details:
      "Now that you know where you want it, scan your munzee and give it a name. Add notes so that others can find it and submit. There are all sorts of different types of munzees to deploy!",
    link: "https://www.munzee.com/types",
    linkText: "Munzee Types",
  },
];

const section3 = [
  {
    iconClass: "fa fa-globe",
    title: "Leaderboards",
    details:
      "See how you stack up against other players worldwide. Daily, Weekly, Monthly and Overall leaderboards are updated near real-time so you always know who is in the lead.",
    link: "https://www.munzee.com/leaderboard/players/all/total",
    linkText: "View Leaderboard",
  },
  {
    iconClass: "fa fa-gavel",
    title: "Clan Wars",
    details:
      "Each month, teams of 10 players join together to compete against each other in the Clan Battles. Collect points and earn weapons throughout the month. Whether you are out for the #1 spot or just going for “The Chuck”, clans are a great way to meet other players from around the world.",
    link: "https://www.munzee.com/clans/",
    linkText: "Clan Central",
  },
  {
    iconClass: "fa fa-shield",
    title: "Badges",
    details:
      "Earn badges through casual game play or set a goal. Some are “Easy as Pi” while others require extra time and patience. Login to your profile in-app or online to see the badges you have earned!",
    link: "https://www.munzee.com/login",
    linkText: "Player Profile",
  },
];

const Game = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="game-page-container">
      <div className="banner">
        <div className="static-map" />
        <div className="btnConatiner">
          <Button className="btn secondaryButton">
            Join in on the fun, find out how!
          </Button>
        </div>
      </div>
      <TitleBar
        bgColor="primary"
        title="786,987,876"
        details="Captures since July 1, 2011."
      />
      <p className="heading" id="how-to-capture">
        Capturing munzees is as easy as 1-2-3
      </p>
      <Container>
        <Grid sx={{ margin: "0 auto 50px" }} container spacing={3}>
          {section1.map(({ iconClass, title, details }) => {
            return (
              <Grid key={title} item xs={12} md={4}>
                <DetailCard
                  iconClass={iconClass}
                  title={title}
                  details={details}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <TitleBar
        bgColor="secondary"
        title="634,744"
        details="Deployments since July 1, 2011."
      />
      <p className="heading">Want to grow the map? Deploy your own munzees.</p>
      <Container>
        <Grid sx={{ margin: "0 auto 50px" }} container spacing={3}>
          {section2.map(({ iconClass, title, details, link, linkText }) => {
            return (
              <Grid key={title} item xs={12} md={4}>
                <DetailCard
                  iconClass={iconClass}
                  title={title}
                  details={details}
                  link={link}
                  linkText={linkText}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <TitleBar
        bgColor="primary"
        startText="Join in with"
        title="12,685,520"
        details="players from around the world."
      />
      <p className="heading"> There is so much more to Munzee</p>
      <Container>
        <Grid sx={{ margin: "0 auto 50px" }} container spacing={3}>
          {section3.map(({ iconClass, title, details, link, linkText }) => {
            return (
              <Grid key={title} item xs={12} md={4}>
                <DetailCard
                  iconClass={iconClass}
                  title={title}
                  details={details}
                  link={link}
                  linkText={linkText}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <h4>Start your Munzee adventure today!</h4>
      <div className="signupSection">
        <Button
          onClick={() => navigate("/download")}
          className="btn primaryButton"
        >
          Sign up
        </Button>
        <Button
          onClick={() => navigate("/download")}
          className="btn secondaryButton"
        >
          Download App
        </Button>
      </div>
    </div>
  );
};

export default Game;
