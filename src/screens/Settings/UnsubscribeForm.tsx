import React from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { settingsLocales as s } from "./settingsLocales";
import { Box, Button } from "@mui/material";

const UnsubscribeForm = ():JSX.Element => {

    const handleSubmitForm = () => {
        console.log('handleSubmitForm');
    };

    return (
        <form id="unsubscribe-form">
            <PageTitle title={s.unsubscribe_title} />
            <Box className="btn-wrapper">
                <Button className="reject-btn" onClick={() => handleSubmitForm()}>{s.unsubscribe_btn}</Button>
            </Box>
        </form>
    )
};

export default UnsubscribeForm;