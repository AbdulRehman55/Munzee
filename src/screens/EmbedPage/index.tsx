import React from "react";
import { Container, Typography, Box, Stack } from "@mui/material";
import { PageTitle } from "../../components";
import { ClientContext } from "../../context/ClientContext";
import "./styles.scss";

const EmbedPage = (): JSX.Element => {
  const { user } = React.useContext(ClientContext);
  return (
    <Container id="embed-page">
      <PageTitle title="Embed" />
      <Typography>
        Embed your munzee information into your email signature, forum
        signature, or on your personal page.
      </Typography>
      <Stack
        mt={3}
        direction="row"
        minWidth="200px"
        maxWidth="240px"
        border="1.5px solid #333"
      >
        <Stack>
          <img
            className="avatar"
            src="https://munzee.global.ssl.fastly.net/images/pins/munzee.png"
          />
        </Stack>
        <Stack>
          <p className="text">{`${user?.points} points`}</p>
          <p className="text">{`${user?.numberOfDeployments} deploys`}</p>
          <p className="text">{`${user?.numberOfCaptures} captures`}</p>
          <p className="text">{`level ${user?.level}`}</p>
        </Stack>
        <Stack alignItems="end" pl="12px">
          <h5>{user?.username}</h5>
          <img className="user-photo" src={user?.avatar}></img>
        </Stack>
      </Stack>
      <Box>
        <label>BBCode:</label>
        <textarea
          value={`[url=https://www.munzee.com/m/${user?.username}/][img]https://www.munzee.com/embed/${user?.username}/[/img][/url]`}
        />
      </Box>
      <Box>
        <label>HTML code:</label>
        <textarea
          value={`<a href="https://www.munzee.com/m/${user?.username}/" target="_blank"><img src="https://www.munzee.com/embed/${user?.username}/"></a>`}
        />
      </Box>
    </Container>
  );
};

export default EmbedPage;
