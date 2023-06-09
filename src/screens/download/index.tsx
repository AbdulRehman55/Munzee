import { Box, Grid, Avatar as MuiAvatar } from "@mui/material";
import React from "react";
import { Container } from "../../components";
import Avatar from "../../assets/images/avatar.png";
import "./styles.scss";

const testimonials = [
  {
    avatar: Avatar,
    message:
      "The new app has a super fast server response! The colorful popup graphics, square and circle icons, and the larger font in distance to target are great. No more trying to read tiny print!",
    username: "BAJACLAN",
    align: "left",
  },
  {
    avatar: Avatar,
    message:
      "I love the bold and bigger numbers for everything. I do like that the munzees are distinctly different between physical and virtual. I especially like the cartoonish feel to the map. It reminds me that this is a game and it is supposed to be fun.",
    username: "CrossedAnchors",
    align: "right",
  },
  {
    avatar: Avatar,
    message:
      "I love many many new things with V4! The overall filter set-up with multiple premium filter settings is great. The new pins are way more accurate for creatures and other previously 'pinless' specials. LOVE LOVE LOVE that the 'Edit location' map will show other Munzees and proximity circles WHEREVER you go now!! New pop-ups that show up when you open the app so you don't miss things is a huge improvement!",
    username: "OldSchoolSkater",
    align: "left",
  },
  {
    avatar: Avatar,
    message:
      "I think 4.0 is going to be a great addition to an already great game. I have participated in the beta testing and I can say that the developers were very patient and listened to all of us - many changes were made and it is very exciting!",
    username: "Suze39",
    align: "right",
  },
  {
    avatar: Avatar,
    message:
      "My favorite thing in 4.0 that they've added is a working 'follow me' mode. It works MUCH better than in v3. I can't wait to make a video comparison :)",
    username: "technical13",
    align: "left",
  },
  {
    avatar: Avatar,
    message:
      "I like that you can have expiring specials & POIs on the map at the same time. I live in this view :) What I love with the fire of a thousand suns is the larger distance font. Bless your ever loving hearts for that.",
    username: "denali0407",
    align: "right",
  },
];

const Download = (): JSX.Element => {
  return (
    <div className="download-page-container">
      <div className="banner">
        <Container>
          <div className="box">
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <div className="box1">
                  <div>
                    <h2>Download the</h2>
                    <h1>ALL NEW</h1>
                    <h2>Version 4.0!</h2>
                  </div>
                  <div className="app-links">
                    <a href="https://apps.apple.com/app/munzee/id1367282248?c=Munzee%20Website%20-%20iOS%20Download&pid=Website&shortlink=1a78f7a9&source_caller=ui">
                      <img
                        src={
                          "https://munzee.global.ssl.fastly.net/images/site/apple-store.svg"
                        }
                        alt=""
                        className="app-store-img"
                      />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.freezetag.munzee&shortlink=f0dec1d3&c=Munzee%20Website%20-%20Android%20Download&pid=Website&source_caller=ui">
                      <img
                        src={
                          "https://munzee.global.ssl.fastly.net/images/site/google-play.svg"
                        }
                        alt=""
                        className="google-store-img"
                      />
                    </a>
                  </div>
                </div>
              </Grid>
              <Grid item xs={0} sm={6}>
                <Box sx={{ display: { sm: "none", md: "block" } }}>
                  <img
                    src={require("../../assets/images/munzee-app.png")}
                    alt=""
                    className="app-bg"
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className="testimonials-header">
        <h3>What other players are saying.</h3>
      </div>
      <div className="testimonial-container">
        <Container>
          <div className="testimonial-body">
            {testimonials?.map((item, index) => {
              return (
                <div className={`${item.align}-testimonial`} key={index}>
                  {item.align === "left" && (
                    <MuiAvatar
                      alt=""
                      src={item.avatar}
                      variant="square"
                      sx={{ borderRadius: 1 }}
                    />
                  )}
                  <div className="message-box">
                    <p>{item.message}</p>
                    <div
                      className="username"
                      style={{ justifyContent: item.align }}
                    >
                      <div className="line" /> <p>{item.username}</p>
                    </div>
                  </div>
                  {item.align === "right" && (
                    <MuiAvatar
                      alt=""
                      src={item.avatar}
                      variant="square"
                      sx={{ borderRadius: 1 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Download;
