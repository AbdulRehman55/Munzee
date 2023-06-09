import React from "react";
import { Outlet } from "react-router-dom";
import { HomePageLoggedIn } from "../components";

export default function HomePageLoggedInLayout(): JSX.Element {
    return (
        <>
            <HomePageLoggedIn />
            <div style={{ background: "#f8f8f8" }}>
                <Outlet />
            </div>
        </>
    );
}
