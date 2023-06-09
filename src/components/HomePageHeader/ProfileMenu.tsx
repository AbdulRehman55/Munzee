import React, { useState } from "react";
import "./styles.scss";
import { Button, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";
import { userProfileData } from "./homePageStructure";
import { Link, useNavigate } from "react-router-dom";
import { userAvatar } from "../../utils/functions/functions";
import noAvatar from "../../assets/images/no_avatar.png";
import { ClientContext } from "../../context/ClientContext";

const ProfileMenu = ():JSX.Element => {

    const [openMenu, setOpenMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const { backend, user } = React.useContext(ClientContext);
    const navigate = useNavigate();
    const userImage = user?.userId ? userAvatar(user?.userId ?? 0) : noAvatar;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        if (loading) { return; }
        setLoading(true);
        const result = await backend?.logout();
        // if (result?.success === true) { }
        navigate("/");
        setLoading(false);
    };

    return (
        <>
            <Button
                id="user-profile-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={ handleClick } >
                    <span className="photo-wrapper">
                        <img src={userImage} alt="avatar" />
                    </span>
                <KeyboardArrowDown />
            </Button>
            <Menu
                className={openMenu ? "user-profile-open" : ""}
                anchorEl={anchorEl}
                open={open}
                onClose={ handleClose }
            >
                {userProfileData.map(item => {
                    if (item.link == "/create/" && user?.userTypeId == 5) {
                        return <></>
                    }
                    /*if(item.link == APP_CONFIG.HOST_STATZEE) {
                        //Display on small device class="visible-sm"
                        // return <></>
                    }*/
                    const link = item.link == "/m/id/" ? `/m/${user?.username}` : item.link;
                    return  <MenuItem>
                                <Link to={link} onClick={handleClose}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </MenuItem>
                })}
                <MenuItem>
                    <a onClick={() => handleLogout()}>
                        <Logout />
                        Logout
                    </a>
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileMenu;