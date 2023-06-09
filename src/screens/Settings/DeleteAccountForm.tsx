import React, { useState } from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { settingsLocales as s } from "./settingsLocales";
import { Box, Button } from "@mui/material";

const UnsubscribeForm = ():JSX.Element => {

    const handleSubmitForm = () => {
        console.log('handleSubmitForm');
    };

    return (
        <form id="delete-account-form">
            <PageTitle title={s.delete_acc} />
            <Box className="btn-wrapper">
                <Button className="reject-btn" onClick={() => handleSubmitForm()}>{s.delete_acc}</Button>
            </Box>
        </form>
    )
};

export default UnsubscribeForm;