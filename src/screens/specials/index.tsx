import React from "react";
import { Link } from "react-router-dom";
import { Container, PageTitleSecondary, Loader } from "../../components";
import { ClientContext } from "./../../context/ClientContext";
import "./style.scss";

type Data = Readonly<{
  name: string;
  logo: string;
  count: number;
}>;

const Specials = () => {
  const { client } = React.useContext(ClientContext);
  const [data, setData] = React.useState<ReadonlyArray<Data>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.user.getSpecials().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [client]);
  return (
    <Container>
      <div className="specials-container">
        <PageTitleSecondary
          title="Specials"
          subtitle="View all Rovert's special captures"
        />
        <div>
          <ul>
            {loading ? <Loader /> : data?.map((item, index) => {
              return (
                <li key={index}>
                  <div className="specials-count">
                    <span className="badge">{item.count}</span>
                  </div>
                  <Link to="#">
                    <img src={item.logo} alt="" />
                    <br />
                    <p>{item.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Specials;
