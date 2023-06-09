import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TypesCard } from "./../../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import data from "./data.json";
import data2 from "./data2.json";

import { Grid, MenuItem, Select, Paper } from "@mui/material";
import "./style.scss";

const Types = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const handleMenuItemClick = (value: string) => {
    setSelectedMenuItem(value);
    // navigate(`/${value}`);
  };

  return (
    <div className="Types-container">
      <Grid container pt={2} gap={6}>
        <Grid item xs={3} pt={6} display="flex" justifyContent="end">
          <Paper
            elevation={2}
            sx={{ width: "auto", padding: "30px" }}
            className="page-container"
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              variant="standard"
              size="small"
              fullWidth
              IconComponent={ExpandMoreIcon}
              MenuProps={{
                sx: {
                  "&& .Mui-selected": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                },
              }}
              sx={{
                "& .MuiSelect-icon": {
                  fill: "#FFB800",
                },
                marginBottom: "16px",
              }}
            >
              <MenuItem value="All Badges (A-Z)">All Badges (A-Z)</MenuItem>
              <MenuItem value="All Badges (Listed Newest)">
                All Badges (Listed Newest)
              </MenuItem>
              <MenuItem value="Achieved Badges">Achieved Badges</MenuItem>
              <MenuItem value="Group 1">Group 1</MenuItem>
              <MenuItem value="Group 2">Group 2</MenuItem>
              <MenuItem value="...">...</MenuItem>
              <MenuItem value="Group n">Group n</MenuItem>
            </Select>
            <MenuItem
              className={`${
                selectedMenuItem === "Daily Challenge" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Daily Challenge")}
            >
              Daily Challenge&nbsp;<b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Points" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Points")}
            >
              Points&nbsp;<b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Capture" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Capture")}
            >
              Capture&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Mythological" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Mythological")}
            >
              Mythological&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Pouch Creatures" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Pouch Creatures")}
            >
              Pouch Creatures&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Deploy" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Deploy")}
            >
              Deploy&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Modern Myths" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Modern Myths")}
            >
              Modern Myths &nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Munzee" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Munzee")}
            >
              Munzee&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Garden Gnomes" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Garden Gnomes")}
            >
              Garden Gnomes&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Zodiacs" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Zodiacs")}
            >
              Zodiacs&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Player Awards" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Player Awards")}
            >
              Player Awards&nbsp; <b>(6)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Munzee SpecialZodiacs"
                  ? "active-item"
                  : ""
              }`}
              onClick={() => handleMenuItemClick("Munzee SpecialZodiacs")}
            >
              Munzee SpecialZodiacs&nbsp; <b>(0)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Premium MemberShip" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Premium MemberShip")}
            >
              Premium MemberShip&nbsp; <b>(0)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Flamingos" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Flamingos")}
            >
              Flamingos&nbsp; <b>(0)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Munzee Mechz" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Munzee Mechz")}
            >
              Munzee Mechz&nbsp; <b>(0)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "MHQ Visit" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("MHQ Visit")}
            >
              MHQ Visit&nbsp; <b>(0)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Meet &" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Meet &")}
            >
              Meet & &nbsp; <b>(0)</b>
            </MenuItem>
            <MenuItem
              className={`${
                selectedMenuItem === "Leaderboard" ? "active-item" : ""
              }`}
              onClick={() => handleMenuItemClick("Leaderboard")}
            >
              Leaderboard&nbsp; <b>(0)</b>
            </MenuItem>
          </Paper>
        </Grid>
        <Grid container xs={6} flexDirection="column">
          <Container>
            <Grid width="100%" item pb={2}>
              <div className="types-header">
                <h2>
                  Meet the Munzees
                  <br />
                  <small>
                    These are the most common types of munzees you will capture
                    out in the wild ... or from your computer.
                  </small>
                </h2>
              </div>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={3}>
                <TypesCard data={data} rotate />
              </Grid>
              <Grid item xs={3}>
                <TypesCard data={data2} rotate={false} />
              </Grid>
              <Grid item xs={3}>
                <TypesCard data={data} rotate />
              </Grid>
              <Grid item xs={3}>
                <TypesCard data={data2} rotate={false} />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};
export default Types;
