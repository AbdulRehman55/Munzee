import React from "react";
import "./styles.scss";
import { moreLocales as m } from "./moreLocales";
import { PageTitle, Loader } from "../../components";
import { Container } from "@mui/material";
import { Done, Close } from "@mui/icons-material";
import { ClientContext } from "../../context/ClientContext";

type ZeeQrewData = Readonly<{
  title: string;
  timeframe: string;
  zeeqrewRequirements: ReadonlyArray<
    Readonly<{
      name: string;
      status: string;
      errorContent: string;
    }>
  >;
  qrewRequirements: ReadonlyArray<
    Readonly<{
      name: string;
      status: string;
      errorContent: string;
    }>
  >;
}>;

const ZeeQRewStatus = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [zeeqrewData, setZeeqrewData] = React.useState<ZeeQrewData>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.user.getZeeqrew().then((result) => {
      setZeeqrewData(result);
      setLoading(false);
    });
  }, [client]);

  const getZeeQRewItems = () => {
    return zeeqrewData?.zeeqrewRequirements.map((item) => {
      return (
        <li>
          {item.name}:
          {!item.errorContent ? (
            <span className="completed">
              {" "}
              <Done /> Completed
            </span>
          ) : (
            <span className="error">
              <Close />
              {item.errorContent}
            </span>
          )}
        </li>
      );
    });
  };

  const getQRewItems = () => {
    return zeeqrewData?.qrewRequirements.map((item) => {
      return (
        <li>
          {item.name}:
          {!item.errorContent ? (
            <span className="completed">
              {" "}
              <Done /> Completed
            </span>
          ) : (
            <span className="error">
              <Close />
              {item.errorContent}
            </span>
          )}
        </li>
      );
    });
  };

  return (
    <Container id="zee-q-rew">
      <PageTitle title={m.zeeQRewTitle} details={zeeqrewData?.timeframe || ""}>
        <p className="page-title-additional-info">
          <span>Current Status: {zeeqrewData?.title}</span>
          <span>Current Timeframe: {zeeqrewData?.timeframe}</span>
        </p>
      </PageTitle>
      <div className="status-columns">
        <div className="column">
          <h5>{m.zeeQRewRequirements1}</h5>
          {loading ? <Loader /> : <ul>{getZeeQRewItems()}</ul>}
        </div>
        <div className="column">
          <h5>{m.zeeQRewRequirements2}</h5>
          {loading ? <Loader /> : <ul>{getQRewItems()}</ul>}
        </div>
      </div>
    </Container>
  );
};

export default ZeeQRewStatus;
