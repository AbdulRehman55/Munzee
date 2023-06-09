import React from "react";
import  Header from "../../../components/headers/index";
import { HomePageHeader } from "../../../components";
import { Footer } from "../../../components";
import { Box, Typography } from "@mui/material";
import { ClientContext } from "../../../context/ClientContext";
import "./styles.scss";
import errorPic from "../../../assets/images/404-not-found.jpeg";

const Error404 = (): JSX.Element => {

  const { user } = React.useContext(ClientContext);

  return (
    <Box id="not-found-page">
        {user ? <HomePageHeader /> : <Header />}
        <Box className="not-found-page-wrapper">
            <img src={errorPic} alt="Error picture" />
            <Typography>
                <h4>Oops, looks like the page is not found</h4>
                <p>If you are lost try the footer links below or hit back.</p>
                <p>If you feel this is an error, please <a href="/contact">contact</a> us.</p>
            </Typography>
        </Box>
        <Footer />
    </Box>
  );
};

export default Error404;
