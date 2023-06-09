import React from "react";
import "./styles.scss";
import { Container } from "@mui/material";
import { PageTitle, Loader } from "../../components";
import { moreLocales } from "./moreLocales";
import Alert from "../../components/alerts";
import MaintenanceMoreItem from "../../components/MorePageItems/MaintenanceMoreItem";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";

export interface maintenanceModeItemType {
  message: string;
  timeReported: string;
  timeCaptured?: string;
}

const MaintenanceMode = (): JSX.Element => {
  const { id } = useParams();
  const { client } = React.useContext(ClientContext);
  const [loading, setLoading] = React.useState(true);

  const [maintenance, setMaintenance] = React.useState<
    ReadonlyArray<maintenanceModeItemType>
  >([]);
  const [softMaintenance, setSoftMaintenance] = React.useState<
    ReadonlyArray<maintenanceModeItemType>
  >([]);

  React.useEffect(() => {
    client?.user.getMaintenance(0, id).then((result) => {
      setMaintenance(result.maintenance);
      setSoftMaintenance(result.softMaintenance);
      setLoading(false);
    });
  }, [client]);

  const getMaintenanceItems = () => {
    return maintenance.map((item) => {
      return (
        <MaintenanceMoreItem
          message={item.message}
          timeReported={item.timeReported}
          timeCaptured={item.timeCaptured && item.timeCaptured}
        />
      );
    });
  };

  const getSoftMaintenanceItems = () => {
    return softMaintenance.map((item) => {
      return (
        <MaintenanceMoreItem
          message={item.message}
          timeReported={item.timeReported}
          timeCaptured={item.timeCaptured && item.timeCaptured}
        />
      );
    });
  };

  const getMaintenanceBlock = () => {
    if (loading) {
      return <Loader />
    } else {
      if(maintenance.length > 0) {
        return <div className="maintenance-mode-items">{getMaintenanceItems()}</div>
      } else {
        return <Alert type="success" align="left">No munzees in maintenance mode.</Alert>
      }
    }
  }

  const getSoftMaintenanceBlock = () => {
    if(loading){
      return <Loader />
    } else {
      if(softMaintenance.length > 0) {
        return <div className="maintenance-mode-items">{getSoftMaintenanceItems()}</div>
      } else {
        return <Alert type="success" align="left">No munzees in soft maintenance mode.</Alert>
      }
    }
  }

  return (
    <Container id="maintenance-mode-more">
      <PageTitle
        title={moreLocales.maintenanceModeTitle}
        details={moreLocales.maintenanceModeDetails}
      />
      {getMaintenanceBlock()}
      <PageTitle
        title={moreLocales.maintenanceModeTitle2}
        details={moreLocales.maintenanceModeDetails2}
      />
      {getSoftMaintenanceBlock()}
    </Container>
  );
};

export default MaintenanceMode;
