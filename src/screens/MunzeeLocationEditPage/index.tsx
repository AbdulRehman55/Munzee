import React, { useEffect, useState } from "react";
import "./styles.scss";
// import UndeploysItem from "./UndeploysItem";
import { undeploysLocales as u } from "./undeploysLocales";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { PageTitle } from "../../components";
//import SearchTypes from "./SearchTypes";
//import { mockData } from "./mockData";
import { archivedLocales as a } from "../ArchivedPage/archivedLocales";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { QrCode } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import Backend, { UserInfo } from "../../munzee-backend";
import { Munzee } from "../../munzee-backend/types";
import SubTitle from "../../components/subtitle";
import MunzeeSidebar from "../../components/MunzeeSidebar";
import MapComponent from "../../components/Map";

const MunzeeLocationEditPage = (): JSX.Element => {
  const { backend, user, publicProfile, setMunzeeRefresh } =
    React.useContext(ClientContext);

  let isValidUser =
    user != undefined &&
    user != null &&
    publicProfile != undefined &&
    publicProfile != null;
  if (isValidUser) {
    isValidUser = user?.userId == publicProfile?.userId && user?.premium == 1;
  }

  if (isValidUser) {
    return (
      <MunzeeLocationEditPageForValidUser
        backend={backend}
        user={user}
        setMunzeeRefresh={setMunzeeRefresh}
      />
    );
  } else {
    return <Container id="undelpoys-page"></Container>;
  }
};

const MunzeeLocationEditPageForValidUser = ({
  backend,
  user,
  setMunzeeRefresh,
}: {
  backend: Backend | null;
  user: UserInfo | null;
  setMunzeeRefresh: any;
}): JSX.Element => {
  const navigate = useNavigate();
  const { munzeeId } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [munzeeDetail, setMunzeeDetail] = useState<Munzee>();
  const refForm = React.useRef(null);
  const [apiResp, setApiResp] = useState<any>();
  const [isMassChange, setIsMassChange] = useState(false);
  const isEventUser = user?.userTypeId == 5;
  const captureId =
    munzeeDetail?.capture_type_id != undefined
      ? parseInt((munzeeDetail?.capture_type_id).toString())
      : undefined;

  const [mapView, setMapView] = useState<"street" | "satellite">("street");
  const [mapZoom, setMapZoom] = useState<number>(15);

  const apiFetchMunzeeDetail = async () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    const currentUrl = window.location.host + window.location.pathname;
    const username = user?.username;
    const munzee = await backend?.munzee.getMunzee({
      url: currentUrl,
      username: username,
    });
    if (munzee) {
      if (
        munzee?.url &&
        munzee?.creator_user_id != user?.userId &&
        user?.maintenanceTeam != 1
      ) {
        navigate(munzee?.url);
      }

      let capture_type_id = munzee?.capture_type_id || 0;
      if (
        munzee?.url &&
        [32, 148, 2588, 3092, 3789].includes(capture_type_id)
      ) {
        navigate(munzee?.url);
      }

      setMunzeeDetail(munzee);
    }
    setIsFetching(false);
  };

  const apiFetchMunzeeHome = async () => {
    const munzee = await backend?.munzee.homeMunzee({
      munzee_id: munzeeId || "",
    });
    if (munzee) {
      console.log("munzee", munzee);
    }
  };

  useEffect(() => {
    if (munzeeId) {
      apiFetchMunzeeDetail();
      apiFetchMunzeeHome();
    }
  }, [munzeeId]);

  const sateliteView = () => {
    setMapView("satellite");
  };
  const streetView = () => {
    setMapView("street");
  };

  const pinLatLng = {
    latitude: munzeeDetail?.latitude || 0,
    longitude: munzeeDetail?.longitude || 0,
  };

  return (
    <Container id="munzee-edit-page">
      <Grid container spacing={2} pt={5}>
        <Grid item md={9} xs={9} pt={0}>
          <PageTitle title={"Position Your Munzee"} />

          {apiResp?.updated == 1 && (
            <div className="alert alert-success">{apiResp?.result}</div>
          )}

          {apiResp?.updated == 0 && (
            <div className="alert alert-danger">{apiResp?.result}</div>
          )}

          <Box style={{ position: "relative" }}>
            <MapComponent
              pos={{
                latitude: munzeeDetail?.latitude || 0,
                longitude: munzeeDetail?.longitude || 0,
              }}
              zoom={mapZoom}
              view={mapView}
              pins={[
                {
                  id: new Date().getTime().toString(), //munzeeDetail?.munzee_id?.toString() || "0",
                  imageUrl: munzeeDetail?.pin_icon,
                  latitude: munzeeDetail?.latitude || 0,
                  longitude: munzeeDetail?.longitude || 0,
                },
              ]}
              onMapBounds={(bounds) => {}}
              showLocationPicker={true}
              onLocationPicked={(latitude, longitude) => {
                (refForm.current as any).setState({
                  pinLatLng: { latitude, longitude },
                });
              }}
            />
            <button
              onClick={sateliteView}
              className={`map-view-btn satelite-btn ${
                mapView == "satellite" ? "active" : ""
              }`}
            >
              satelite
            </button>
            <button
              onClick={streetView}
              className={`map-view-btn street-btn ${
                mapView == "street" ? "active" : ""
              }`}
            >
              street
            </button>
          </Box>

          <Box mt={1}>
            <SubTitle title={"Fine tune coordinates"} />
            {munzeeDetail && backend && user && (
              <FineTuneCoordinatesClass
                ref={refForm}
                backend={backend}
                user={user}
                munzeeDetail={munzeeDetail}
                callback={(newMunzee) => {
                  setApiResp(newMunzee);
                  apiFetchMunzeeDetail();
                }}
                pinLatLng={pinLatLng}
              />
            )}
          </Box>
        </Grid>
        <Grid item md={3} xs={3} pt={0}>
          {munzeeDetail && (
            <MunzeeSidebar
              screenType={"edit_munzee_location"}
              munzeeDetail={munzeeDetail}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

interface iFineTuneCoordinates {
  user: UserInfo;
  backend: Backend;
  munzeeDetail: Munzee;
  callback: (newMunzee: Munzee) => void;
  pinLatLng: { latitude: number; longitude: number };
}

class FineTuneCoordinatesClass extends React.Component<iFineTuneCoordinates> {
  state = {
    pinLatLng: this.props.pinLatLng,
  };

  render() {
    return (
      <FineTuneCoordinates
        backend={this.props.backend}
        user={this.props.user}
        munzeeDetail={this.props.munzeeDetail}
        callback={this.props.callback}
        pinLatLng={this.state.pinLatLng}
      />
    );
  }
}

const FineTuneCoordinates = ({
  user,
  backend,
  munzeeDetail,
  callback,
  pinLatLng,
}: iFineTuneCoordinates) => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState<number>(pinLatLng.latitude);
  const [longitude, setLongitude] = useState<number>(pinLatLng.longitude);

  useEffect(() => {
    setLatitude(parseFloat(Number(pinLatLng.latitude).toFixed(7)));
    setLongitude(parseFloat(Number(pinLatLng.longitude).toFixed(7)));
  }, [pinLatLng]);

  const handleLatitude = (e: any): void => {
    setLatitude(e.target.value);
  };

  const handleLongitude = (e: any): void => {
    setLongitude(e.target.value);
  };

  // (e: React.FormEvent<HTMLFormElement>)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      munzeeDetail?.url &&
      munzeeDetail?.creator_user_id != user?.userId &&
      user?.maintenanceTeam != 1
    ) {
      navigate(munzeeDetail?.url);
    }

    backend?.munzee
      .updateMunzee({
        username: user?.username || "",
        munzee_id: munzeeDetail!!.munzee_id || 0,
        friendly_name: munzeeDetail?.friendly_name,
        notes: munzeeDetail?.notes,
        latitude: latitude,
        longitude: longitude,
        deployed: munzeeDetail!!.deployed,
      })
      .then((munzee) => {
        if (munzee) {
          console.log("munzee", munzee);
          // setApiResp(munzee);
          // apiFetchMunzeeDetail();
          callback(munzee);
        }
      });
  };

  return (
    <form
      className="form-inline"
      role="form"
      method="post"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2} pt={0}>
        <Grid item md={4} xs={12} pt={0}>
          <TextField
            variant="outlined"
            fullWidth
            name="latitude"
            // value={ Number(latitude).toFixed(7)}
            value={latitude}
            onChange={handleLatitude}
            inputProps={{
              style: {
                padding: "8px 12px",
              },
            }}
          />
        </Grid>
        <Grid item md={4} xs={12} pt={0}>
          <TextField
            variant="outlined"
            fullWidth
            name="longitude"
            // value={Number(longitude).toFixed(7)}
            value={longitude}
            onChange={handleLongitude}
            inputProps={{
              style: {
                padding: "8px 12px",
              },
            }}
          />
        </Grid>
        <Grid item md={4} xs={12} pt={0}>
          <Button type="submit" variant="contained" className="update-btn">
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MunzeeLocationEditPage;
