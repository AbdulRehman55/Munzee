import React from "react";
import "./styles.scss";
import { Container, PageTitle, VerticalTabs } from "../../components";
import data from "./data.json";
import { Box, Grid } from "@mui/material";

const TermsOfService = () => {
  return (
    <Container>
      <div className="terms-of-service-container">
        <Grid container spacing={3}>
          <Grid item xs={false} sm={false} md={4} lg={2}>
            <Box sx={{ display: { sm: "none", xs: "none", md: "block" } }}>
              <VerticalTabs
                data={[
                  { title: "About", route: "/company/about" },
                  { title: "Team", route: "/company/team" },
                  { title: "Play Safe", route: "/playsafe" },
                  { title: "Contact", route: "/company/contact" },
                  { title: "Terms of Service", route: "/terms" },
                  { title: "Privacy Policy", route: "/privacy" },
                ]}
              />
            </Box>
          </Grid>
          <Grid item xs={false} sm={false} md={8} lg={10}>
            <PageTitle title="Terms of Service" />
            <div className="terms-of-service-content">
              {data?.map((item, index) => {
                return (
                  <p
                    key={`term#${index}`}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default TermsOfService;
