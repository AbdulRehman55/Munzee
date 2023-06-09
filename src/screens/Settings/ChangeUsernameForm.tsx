import React, { useContext } from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { settingsLocales as s } from "./settingsLocales";
import { Box, Button, TextField } from "@mui/material";
import zeds from "../../assets/images/zeds.png";
import { ClientContext } from "../../context/ClientContext";

const ChangeUsernameForm = (): JSX.Element => {
  const { client } = useContext(ClientContext);

  const [username, setUsername] = React.useState("");

  const handleSubmitForm = () => {
    client?.settings.changeUsername(username).then((result) => {
      alert(`Change username: ${result.success}`);
    });
  };

  return (
    <form id="change-username-form">
      <PageTitle title={s.change_username} />
      <Box className="change-username-wrapper">
        <TextField
          id="change-username"
          label={s.new_name}
          defaultValue=""
          value={username}
          onChange={(e) => setUsername(e?.target?.value || "")}
        />
        <span>{s.new_name_details}</span>
      </Box>
      <Box className="btn-wrapper">
        <Button className="confirm-btn" onClick={() => handleSubmitForm()}>
          1000 <img src={zeds} alt="Zeds" />
        </Button>
      </Box>
    </form>
  );
};

export default ChangeUsernameForm;
