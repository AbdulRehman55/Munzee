import React from "react";
import { Alert, Container, PageTitle, Loader } from "../../components";
import { ClientContext } from "../../context/ClientContext";
import "./style.scss";

type Credit = Readonly<{
  image: string;
  title: string;
  count: number;
}>;

type History = Readonly<{
  date: string;
  item: string;
  description: string;
}>;

const Credits = () => {
  const { client } = React.useContext(ClientContext);

  const [credits, setCredits] = React.useState<ReadonlyArray<Credit>>([]);
  const [history, setHistory] = React.useState<ReadonlyArray<History>>([]);
  const [loadingCredits, setLoadingCredits] = React.useState(true);
  const [loadingHistory, setLoadingHistory] = React.useState(true);

  React.useEffect(() => {
    client?.credits.getCredits().then((result) => {
      setCredits(result);
      setLoadingCredits(false);
    });
    client?.credits.getHistory().then((result) => {
      setHistory(result);
      setLoadingHistory(false);
    });
  }, [client]);

  return (
    <Container>
      <div className="credits-screen-container">
        <PageTitle title="Your Credits" />
        <div>
          <ul>
            {loadingCredits ? <Loader /> : credits?.map((credit, credIndex) => {
              return (
                <li key={`credit${credIndex}`}>
                  <img
                    src={credit.image}
                    data-toggle="tooltip"
                    data-placement="top"
                    data-original-title={credit.title}
                    alt=""
                  />
                  <h3>{credit.count}</h3>
                </li>
              );
            })}
          </ul>
          <div className="alert-container">
            <Alert type="success" align="center">
              Credits for special munzee types can be purchased from the{" "}
              <b>Freeze Tag Store.</b>
              <br />
              You can redeem certain types of credits for deploy credits or
              munzees using the <b>Redeem Page.</b>
            </Alert>
          </div>
        </div>
        <PageTitle title="Item History" />
        <div className="table-area">
          <table className="table">
            <tbody>
              {loadingHistory ? <Loader /> : history?.map((item, index) => {
                return (
                  <tr key={`item#${index}`}>
                    <td>{item.date}</td>
                    <td>{item.item}</td>
                    <td>
                      <i>{item.description}</i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>* showing the latest 200 items added to your account</p>
        </div>
      </div>
    </Container>
  );
};

export default Credits;
