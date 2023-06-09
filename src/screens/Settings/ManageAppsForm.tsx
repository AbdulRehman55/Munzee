import React from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { settingsLocales as s } from "./settingsLocales";

const ManageAppsForm = ():JSX.Element => {
    return (
        <form id="manage-apps-form">
            <PageTitle title={s.manage_apps_title} />
            <span>
                    {s.manage_apps_text[0]}
                <a href="/revoke">{s.manage_apps_text[1]}</a>
                {s.manage_apps_text[2]}
                </span>
            <span>
                {s.manage_apps_details[0]}
            <a href="https://www.munzee.com/premium">{s.manage_apps_details[1]}</a>
            </span>
        </form>
    )
};

export default ManageAppsForm;