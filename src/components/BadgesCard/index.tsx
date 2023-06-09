import React from "react";
import "./styles.scss";
import { Popover, Typography } from "@mui/material";

interface iProps {
  icon: string;
  name: string;
  awarded: boolean;
  children: any;
}
const BadgesCard = ({ icon, name, awarded, children }: iProps): JSX.Element => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

  return (
    <div className="badges-card">
        <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            <img
                style={{ filter: awarded ? undefined : "grayscale(1)" }}
                src={icon}
            />
            <span>{name}</span>
        </Typography>
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <h5>{name}</h5>
            <div className="content-wrapper">
                <span>{children[0]}</span>
                <span>{children[1]}</span>
            </div>
        </Popover>
    </div>
  );
};

export default BadgesCard;
