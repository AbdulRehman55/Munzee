import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import { Box, Button, Container, Typography } from "@mui/material";
import { PageTitle, MapComponent, Loader } from "../../components";
import { filterIcons } from "./mockData";
import { ClientContext } from "../../context/ClientContext";
import dragonIcon from "../../assets/images/dragon.png";
import faunIcon from "../../assets/images/faun.png";
import leprechaunIcon from "../../assets/images/leprechaun.png";
import unicornIcon from "../../assets/images/theunicorn.png";
import yetiIcon from "../../assets/images/yeti.png";

interface iconBtnsProps {
  id: string;
  icon: string;
}
type Data = ReadonlyArray<Readonly<{ [key: number]: number }>>;
const IconButton = ({ id, icon }: iconBtnsProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log(
      "Current filter status",
      id,
      show
    ); /* DATA TO BE SENT ON BACKEND LATER */
  });

  return (
    <Button
      className={`icon-btn ${show ? " show" : ""}`}
      id={id}
      onClick={() => setShow(!show)}
    >
      <img src={icon} alt={id} />
    </Button>
  );
};

const SpecialsPage = (): JSX.Element => {
  const [allTypesFilter, setAllTypesFilter] = useState(false);
  const { client } = useContext(ClientContext);
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState(true);

  const iconOptions = [
    dragonIcon,
    faunIcon,
    leprechaunIcon,
    unicornIcon,
    yetiIcon,
  ];

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconOptions.length);
    return iconOptions[randomIndex];
  };
  useEffect(() => {
    client?.captured
      .getCapturedTypeCount({
        type_ids:
          "296,297,505,508,573,521,568,725,853,822,823,824,999,953,1100,1118,1151,1164,1168,1210,1229,1237,1240,1241,1242,1268,1329,1370,1371,1372,1378,1485,1544,1580,1630,1637,1638,1639,1640,1691,1705,1706,1707,1745,1752,1753,1754,1755,3314,3315,3316,1827,1919,1985,1986,1987,1929,2118,2240,2241,2242,2306,2333,2334,2337,2366,2367,2368,2369,2370,2371,2372,2373,2374,2375,2407,2408,2409,2524,2576,2625,2626,2627,2640,2641,2716,3363,3364,3365",
      })
      .then((result: Data) => {
        console.log(result, "result");
        setData(result);
        setLoading(false);
      });
  }, [client]);
  const getIconBtns = () => {
    return filterIcons.map((item) => {
      return <IconButton id={item.id} icon={item.icon} />;
    });
  };
  const getRows = (data: Data) => {
    return Object.entries(data).map(([key, value]) => {
      const displayValue = Object.values(value)[0];
      const randomIcon = getRandomIcon();

      return (
        <Box className="grid-row" key={key}>
          <Typography>{displayValue}</Typography>
          <img src={randomIcon} alt="Icon" />
        </Box>
      );
    });
  };

  return (
    <Container id="specials-page">
      <PageTitle
        title="Special Munzees"
        details="Go capture a nomad, virtual nomad, a unicorn, or something a bit more special ..."
      />
      <MapComponent
        pos={{ latitude: 1, longitude: 1 }}
        zoom={0}
        view={"street"}
        pins={[]}
        onMapBounds={(bounds) => {}}
      />
      <Box className="places-filters">
        <Typography>Filters: </Typography>
        {getIconBtns()}
        <Button
          className="alltypes-btn"
          onClick={() => setAllTypesFilter(!allTypesFilter)}
        >
          All Types
        </Button>
      </Box>
      <Box className="captures-grid">
        <div className="captures-grid-header">Captures</div>
        <div className="captures-grid-rows">{loading ? <Loader /> : getRows(data)}</div>
      </Box>
      <span className="tip">* updated hourly</span>
    </Container>
  );
};

export default SpecialsPage;
