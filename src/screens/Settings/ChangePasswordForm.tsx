import React, { useContext } from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { settingsLocales as s } from "./settingsLocales";
import { Box, Button, TextField } from "@mui/material";
import { ClientContext } from "../../context/ClientContext";

const ChangePasswordForm = (): JSX.Element => {
  const { client } = useContext(ClientContext);

  const [newPass, setNewPass] = React.useState("");
  const [oldPass, setOldPass] = React.useState("");
  const [verifyPass, setVerifyPass] = React.useState("");

  const handleSubmitForm = () => {
    if (newPass !== verifyPass) {
      alert("Password verification does not match.");
    }
    client?.settings.changePassword(oldPass, newPass).then((result) => {
      alert(
        `Password changed: ${result.error || JSON.stringify(result.success)}`
      );
    });
  };

  return (
    <form>
      <PageTitle title={s.change_pass_title} />
      <Box className="change-pass-wrapper">
        <TextField
          id="old-password"
          type="password"
          label={s.old_pass}
          defaultValue=""
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <span>{s.old_pass}</span>
        <TextField
          id="new-password"
          type="password"
          label={s.new_pass}
          defaultValue=""
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <span>{s.new_pass}</span>
        <TextField
          id="verify-password"
          type="password"
          label={s.verify_pass}
          defaultValue=""
          value={verifyPass}
          onChange={(e) => setVerifyPass(e.target.value)}
        />
        <span>{s.verify_pass}</span>
      </Box>
      <Box className="btn-wrapper">
        <Button className="confirm-btn" onClick={() => handleSubmitForm()}>
          {s.change_pass_btn}
        </Button>
      </Box>
    </form>
  );
};

export default ChangePasswordForm;
