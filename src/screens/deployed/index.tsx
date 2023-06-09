import React from "react";
import "./style.scss";
import {
  Container,
  PageTitleSecondary,
  PaginationButton,
  Section,
  SimpleInput,
  Loader,
} from "../../components";
import { Stack } from "@mui/material";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";

type Data = Readonly<{
  iconName: string;
  iconImg: string;
  captureMonth: string;
  iconLink: string;
  points: number;
  userName: string;
  avatar: string;
  userLink: string;
  deployedYear: string;
  numCaptures: number;
}>;

const Deployed = (): JSX.Element => {
  const { id } = useParams();
  const { client, user } = React.useContext(ClientContext);

  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState<ReadonlyArray<Data>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.user.getCaptures(page, id).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [client, page]);

  return (
    <Container>
      <div className="deploys-container">
        <PageTitleSecondary
          title="Deployments"
          subtitle={`View all ${user?.username || ""}'s deployments`}
        />
        <div className="icons-container">
          <p>only show one type:</p>
          {loading ? <Loader /> : data.map((item, key) => {
            return (
              <div className="icon-wrapper" key={key}>
                <a href={item.iconLink}>
                  <img src={item.iconImg} />
                </a>
              </div>
            );
          })}
          <SimpleInput
            title="search by name:"
            placeholder="min. 3 characters"
            label="go"
          />
        </div>
        <div className="section-holder">
          {data.map((item: Data, key) => {
            return (
              <Section
                key={key}
                item={item}
                iconSubText="deployed 2 years ago"
                iconCapText={`${item.numCaptures} captures`}
                userSubText="last captured 10 months ago"
              />
            );
          })}
        </div>
        <Stack direction="row" justifyContent="space-between" pb={10}>
          <PaginationButton
            title="Older"
            iconPosition="left"
            className="fa fa-arrow-left"
            onClick={() => {
              setPage(page + 1);
            }}
          />
          <PaginationButton
            title="Map"
            iconPosition="right"
            className="fa fa-globe"
          />
          <PaginationButton
            title="Newer"
            iconPosition="right"
            className="fa fa-arrow-right"
            disabled={page <= 0}
            onClick={() => {
              setPage(page - 1);
            }}
          />
        </Stack>
      </div>
    </Container>
  );
};

export default Deployed;
