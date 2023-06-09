import React, { useState } from "react";
import "./styles.scss";
import { Grid, MenuItem, Paper, Select, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PageTitle, Loader } from "../../components";
import BadgesCard from "../../components/BadgesCard";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";

type Badge = Readonly<{
  icon: string;
  name: string;
  tooltip: ReadonlyArray<string>;
  awarded: boolean;
}>;

type Category = Readonly<{
  id: string;
  name: string;
  count: number;
}>;

const selectMenuItemsData = [
  "All Badges (A-Z)",
  "All Badges (Listed Newest)",
  "Achieved Badges",
  "Group 1",
  "Group 2",
  "...",
  "Group n",
];

const BadgesPage = (): JSX.Element => {
  const { id } = useParams();
  const { client } = React.useContext(ClientContext);

  const [category, setCategory] = React.useState<string>();
  const [badges, setBadges] = React.useState<ReadonlyArray<Badge>>([]);
  const [categories, setCategories] = React.useState<ReadonlyArray<Category>>(
    []
  );
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.badges.getCategories().then((result) => {setCategories(result);});
    client?.badges.getBadges(category, id).then((result) => {
      setBadges(result);
      setLoading(false);
    });
  }, [client, category]);

  const getCategoryMenuItems = () => {
    return categories.map((item) => {
      return (
        <MenuItem
          className={`${category === item.id ? "active-item" : ""}`}
          onClick={() => {
            setCategory(item.id);
          }}
        >
          {item.name}&nbsp;<b>({item.count})</b>
        </MenuItem>
      );
    });
  };

  const getSelectedMenuItems = () => {
    return selectMenuItemsData.map((item) => {
      return <MenuItem value={item}>{item}</MenuItem>;
    });
  };

  const getBadgesItems = () => {
    return badges.map((item, index) => {
      return (
        <Grid item xs={2}>
          <BadgesCard
            icon={item.icon}
            name={item.name}
            awarded={item.awarded}
            key={index}
          >
            {item.tooltip}
          </BadgesCard>
        </Grid>
      );
    });
  };

  const selectedCategoryName =
    categories.find((c) => c.id === category)?.name || "";

  return (
    <div id="badges-page">
      <Grid container pt={2} gap={3} className="badges-wrapper">
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
              value={selectedCategoryName}
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
              onChange={(e) => console.log(e.target.value)}
            >
              {getSelectedMenuItems()}
            </Select>
            {getCategoryMenuItems()}
          </Paper>
        </Grid>
        <Grid container xs={8} flexDirection="column">
          <Box>
            <Grid width="100%" item pb={2}>
              <PageTitle title={selectedCategoryName} />
            </Grid>
            <Grid item container spacing={3} className="badges-items">
              {loading ? <Loader /> : getBadgesItems()}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default BadgesPage;
