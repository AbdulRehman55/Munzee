import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { PageTitle, Alert, MapComponent, Loader } from "../../components";
import { settingsLocales as s } from "./settingsLocales";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  deploymentNotificationOptions,
  distTypeOptions,
  timeZoneOptions,
} from "./settingsData";
import { ClientContext } from "../../context/ClientContext";

type Settings = Readonly<{
  email?: string;
  distance_type?: string;
  map_options?: number;
  nearby_distance?: string;
  private_mode?: boolean;
  summary_daily?: boolean;
  summary_weekly?: boolean;
  timezone?: string;
  home_latitude?: number;
  home_longitude?: number;
}>;

interface AccountSettingsFormProps {}

const AccountSettingsForm = (props: AccountSettingsFormProps): JSX.Element => {
  const { client } = useContext(ClientContext);
  const [timeZone, setTimeZone] = useState(timeZoneOptions[0].value);
  const [deploymentNotification, setDeploymentNotification] = useState(
    deploymentNotificationOptions[0].value
  );
  const [distType, setDistType] = useState(distTypeOptions[0].value);
  const [email, setEmail] = useState("");
  const [settings, setSettings] = useState<Settings>({});

  const [summaryDaily, setSummaryDaily] = useState(false);
  const [summaryWeekly, setSummaryWeekly] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);
  const [mapOptionsOwn, setMapOptionsOwn] = useState(false);
  const [mapOptionsCaptured, setMapOptionsCaptured] = useState(false);
  const [mapOptionsSpecial, setMapOptionsSpecial] = useState(false);
  const [mapOptionsZoom, setMapOptionsZoom] = useState(false);
  const [homeLatitude, setHomeLatitude] = useState(0);
  const [homeLongitude, setHomeLongitude] = useState(0);

  const [validation, setValidation] = useState<
    { success: boolean; error?: string } | undefined
  >();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.settings.getSettings().then((result) => {
      setSettings(result);
      setLoading(false);
    });
  }, [client]);

  const handleChangeTimeZone = (event: SelectChangeEvent) => {
    setTimeZone(event.target.value as string);
  };
  const handleChangeDeployNotification = (event: SelectChangeEvent) => {
    setDeploymentNotification(event.target.value as string);
  };
  const handleChangeDistType = (event: SelectChangeEvent) => {
    setDistType(event.target.value as string);
  };

  const handleSubmitForm = () => {
    client?.settings
      .updateSettings({
        map_options: getMapOptions(),
        email: email,
        timezone: timeZone,
        distance_type: distType,
        summary_daily: summaryDaily,
        summary_weekly: summaryWeekly,
        private_mode: privateMode,
        home_latitude: homeLatitude,
        home_longitude: homeLongitude,
      })
      .then((result) => setValidation(result));
  };

  useEffect(() => {
    setTimeZone(settings.timezone || "0.0");
    setDistType(settings.distance_type || "mi");
    setEmail(settings.email || "");
    setDeploymentNotification(settings.nearby_distance || "0");
    setSummaryDaily(settings.summary_daily || false);
    setSummaryWeekly(settings.summary_weekly || false);
    setPrivateMode(settings.private_mode || false);
    setMapOptionsOwn(
      [1, 4, 5, 7, 8, 9, 10, 11].includes(
        parseInt("0" + settings.map_options, 10)
      )
    );
    setMapOptionsCaptured(
      [1, 4, 5, 7, 8, 9, 10, 11].includes(
        parseInt("0" + settings.map_options, 10)
      )
    );
    setMapOptionsSpecial(
      [1, 4, 5, 7, 8, 9, 10, 11].includes(
        parseInt("0" + settings.map_options, 10)
      )
    );
    setMapOptionsZoom(
      [1, 4, 5, 7, 8, 9, 10, 11].includes(
        parseInt("0" + settings.map_options, 10)
      )
    );
  }, [settings]);

  const getMapOptions = () => {
    if (mapOptionsOwn) {
      if (mapOptionsCaptured) {
        if (mapOptionsSpecial) {
          if (mapOptionsZoom) return 8;
          else return 7;
        } else {
          if (mapOptionsZoom) return 9;
          else return 4;
        }
      } else {
        if (mapOptionsSpecial) {
          if (mapOptionsZoom) return 10;
          else return 5;
        } else {
          if (mapOptionsZoom) return 11;
          else return 1;
        }
      }
    } else {
      if (mapOptionsCaptured) {
        if (mapOptionsSpecial) {
          if (mapOptionsZoom) return 12;
          else return 6;
        } else {
          if (mapOptionsZoom) return 13;
          else return 2;
        }
      } else {
        if (mapOptionsSpecial) {
          if (mapOptionsZoom) return 14;
          else return 3;
        } else {
          if (mapOptionsZoom) return 15;
          else return 0;
        }
      }
    }
  };

  const onLocationPicked = React.useCallback(
    (latitude: number, longitude: number) => {
      setHomeLatitude(latitude);
      setHomeLongitude(longitude);
      console.log(`Setting home to ${latitude}, ${longitude}.`);
    },
    []
  );

  const mapComponent = React.useMemo(
    () => (
      <MapComponent
        pos={{
          latitude: settings.home_latitude || 0,
          longitude: settings.home_longitude || 0,
        }}
        zoom={0}
        view={"street"}
        pins={[]}
        showLocationPicker={true}
        onLocationPicked={onLocationPicked}
      />
    ),
    [client, settings.home_latitude, settings.home_longitude, onLocationPicked]
  );

  return (
    <form className="account-settings-form">
      <PageTitle title={s.account_settings_title} />

      {validation?.success ? (
        <Alert type="success" align="left">
          Your settings have been updated.
        </Alert>
      ) : validation?.error ? (
        <Alert type="error" align="left">
          {validation?.error}
        </Alert>
      ) : (
        ""
      )}

      <Box className="option-wrapper">
        <div className="email-opt">
          <h5>{s.email_options_title}</h5>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setSummaryDaily(e.target.checked)}
                  checked={summaryDaily}
                />
              }
              label={s.email_options_1}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setSummaryWeekly(e.target.checked)}
                  checked={summaryWeekly}
                />
              }
              label={s.email_options_2}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setPrivateMode(e.target.checked)}
                  checked={privateMode}
                />
              }
              label={s.email_options_3}
            />
          </FormGroup>
        </div>
        <div className="map-opt">
          <h5>{s.map_options_title}</h5>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setMapOptionsOwn(e.target.checked)}
                  checked={mapOptionsOwn}
                />
              }
              label={s.map_options_1}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setMapOptionsCaptured(e.target.checked)}
                  checked={mapOptionsCaptured}
                />
              }
              label={s.map_options_2}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setMapOptionsSpecial(e.target.checked)}
                  checked={mapOptionsSpecial}
                />
              }
              label={s.map_options_3}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setMapOptionsZoom(e.target.checked)}
                  checked={mapOptionsZoom}
                />
              }
              label={s.map_options_4}
            />
          </FormGroup>
        </div>
      </Box>
      <Box className="selects-wrapper">
        <FormControl id="time-zone-wrapper">
          <InputLabel id="time-zone-select-label">
            {s.time_zone_title}
          </InputLabel>
          <Select
            labelId="time-zone-select-label"
            id="time-zone-select"
            value={timeZone}
            label={s.time_zone_title}
            onChange={handleChangeTimeZone}
          >
            {timeZoneOptions.map((item) => {
              return <MenuItem value={item.value}>{item.title}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl id="deploy-notification-wrapper">
          <InputLabel id="dist-type-select-label">
            {s.deploy_notificationTitle}
          </InputLabel>
          <Select
            labelId="dist-type-select-label"
            id="deploy-notification-select"
            value={deploymentNotification}
            label={s.deploy_notificationTitle}
            onChange={handleChangeDeployNotification}
          >
            {deploymentNotificationOptions.map((item) => {
              return <MenuItem value={item.value}>{item.title}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl id="dist-type-wrapper">
          <InputLabel id="dist-type-select-label">
            {s.distance_type_title}
          </InputLabel>
          <Select
            labelId="dist-type-select-label"
            id="dist-type-select"
            value={distType}
            label={s.distance_type_title}
            onChange={handleChangeDistType}
          >
            {distTypeOptions.map((item) => {
              return <MenuItem value={item.value}>{item.title}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          id="email-address"
          label={s.email_address}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <h4>{s.home_location}</h4>
        <div className="map-wrapper">{loading ? <Loader /> : mapComponent}</div>
        <span>{s.home_location_details}</span>
      </Box>
      <Box className="btn-wrapper">
        <Button className="confirm-btn" onClick={() => handleSubmitForm()}>
          {s.save_btn}
        </Button>
      </Box>
    </form>
  );
};

export default AccountSettingsForm;
