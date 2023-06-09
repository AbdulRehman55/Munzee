import React, { useEffect, useState } from "react";
import moment from "moment";
import { Box, Grid } from "@mui/material";
import { Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import "./styles.scss";

type BlogEntry = Readonly<{
  id: string;
  type: string;
  show_at: string;
  hide_at: string;
  title: string;
  start_time: string;
  end_time: string;
  blog_url: string;
  image_url: string;
  mailbox_tier: string;
}>;
const Footer = (): JSX.Element => {
  const [blogsEntries, setBlogsEntries] = useState<ReadonlyArray<BlogEntry>>(
    []
  );
  const navigate = useNavigate();
  const { client } = React.useContext(ClientContext);

  useEffect(() => {
    client?.blogs
      .getBlogs({ current_page: 1, per_page: 5 })
      .then((result: any) => {
        const sortedBlogs = result?.data.sort(
          (a: BlogEntry, b: BlogEntry) =>
            moment(b.show_at).valueOf() - moment(a.show_at).valueOf()
        );
        setBlogsEntries(sortedBlogs);
      });
  }, [client]);

  const links = [
    {
      title: "Navigate",
      pages: [
        {
          name: "Home",
          redirect: () => {
            navigate("/");
          },
        },
        {
          name: "Game",
          redirect: () => {
            navigate("/game");
          },
        },
        {
          name: "Leaderboards",
          redirect: () => {
            navigate("/leaderboard/players/all/total");
          },
        },
        { name: "Store", redirect: () => {} },
        { name: "MunzPak", redirect: () => {} },
        {
          name: "Authorized Retail Outlets",
          redirect: () => {
            navigate("/retail");
          },
        },
        {
          name: "Map",
          redirect: () => {
            navigate("/map");
          },
        },
        { name: "Status", redirect: () => {} },
      ],
    },
    {
      title: "Get Started",
      pages: [
        {
          name: "Download",
          redirect: () => {
            navigate("/download");
          },
        },
        {
          name: "Login",
          redirect: () => {
            navigate("/login");
          },
        },
        { name: "Calendar", redirect: () => {} },
        {
          name: "Types of Munzees",
          redirect: () => {
            navigate("/types");
          },
        },
        { name: "Gardens", redirect: () => {} },
        { name: "Places Munzees", redirect: () => {} },
        { name: "Specials", redirect: () => {} },
        {
          name: "Terms of Service",
          redirect: () => {
            navigate("/terms");
          },
        },
        {
          name: "Privacy Policy",
          redirect: () => {
            navigate("/privacy");
          },
        },
        { name: "Help Manual", redirect: () => {} },
      ],
    },
    {
      title: "Company",
      pages: [
        {
          name: "About",
          redirect: () => {
            navigate("/company/about");
          },
        },
        {
          name: "Team",
          redirect: () => {
            navigate("/company/team");
          },
        },
        // { name: "In The News", redirect: () => {} },
        // { name: "Testimonials", redirect: () => {} },
        // { name: "Announcements", redirect: () => {} },
        {
          name: "Play Safe",
          redirect: () => {
            navigate("/playsafe");
          },
        },
        {
          name: "Contact",
          redirect: () => {
            navigate("/company/contact");
          },
        },
        { name: "Join us on DISCORD", redirect: () => {} },
      ],
      socials: [
        {
          icon: "fa fa-facebook",
          redirect: "https://www.facebook.com/munzeeinfo/",
        },
        { icon: "fa fa-twitter", redirect: "https://twitter.com/munzee/" },
        { icon: "fa fa-reddit", redirect: "https://www.reddit.com/r/munzee" },
        {
          icon: "fa fa-youtube",
          redirect: "https://www.youtube.com/user/OfficialMunzee",
        },
        {
          icon: "fa fa-instagram",
          redirect: "https://www.instagram.com/munzeeapp/",
        },
      ],
    },
  ];

  return (
    <div className="footer">
      <Container>
        <div className="footer-items">
          <Grid container spacing={2}>
            {links?.map((item, index) => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={2}
                  lg={2}
                  key={`footerLink${index}`}
                >
                  <p className="title">{item?.title}</p>
                  <div className="link-box">
                    {item?.pages?.map((page, pageInd) => {
                      return (
                        <div
                          key={`footerPage${pageInd}`}
                          onClick={page.redirect}
                        >
                          <p className="link">{page.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  {item?.socials && (
                    <div className="socials">
                      {item?.socials?.map((social, socialInd) => {
                        return (
                          <div key={`footerSocials${socialInd}`}>
                            <a
                              href={social.redirect}
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              <i className={social.icon}></i>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Grid>
              );
            })}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                className="blog-box"
                sx={{ margin: { sm: 0, md: "0px auto" } }}
              >
                <Link to="https://www.munzeeblog.com/">
                  <p className="title">Blog Entries</p>
                </Link>

                <div className="blogs-container">
                  {blogsEntries?.map((blog, blogInd) => {
                    return (
                      <div key={`footerBlob${blogInd}`} className="blog-row">
                        <a
                          href={blog?.blog_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {blog.title}
                        </a>
                        <div className="time">
                          <i className="fa fa-clock-o"></i>{" "}
                          <small>
                            {moment(blog.show_at).format("MMM D, YYYY")}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
