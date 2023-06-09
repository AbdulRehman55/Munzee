import React from "react";
import "./styles.scss";
import { Container } from "@mui/material";
import AccountSettingsForm from "./AccountSettingsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangePictureForm from "./ChangePictureForm";
import ChangeUsernameForm from "./ChangeUsernameForm";
import ManageAppsForm from "./ManageAppsForm";
import UnsubscribeForm from "./UnsubscribeForm";
import DeleteAccountForm from "./DeleteAccountForm";

const UserProfileSettings = (): JSX.Element => {
  return (
    <Container id="user-profile-settings">
      <AccountSettingsForm />
      <ChangePasswordForm />
      <ChangePictureForm />
      <ChangeUsernameForm />
      <ManageAppsForm />
      <UnsubscribeForm />
      <DeleteAccountForm />
    </Container>
  );
};

export default UserProfileSettings;
