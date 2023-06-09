import React from "react";
import "./style.scss";
import {
  Container,
  PageTitleSecondary,
  PaginationButton,
  Section,
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
}>;

const Captures = () => {
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
      <div className="captures-container">
        <PageTitleSecondary
          title="Captures"
          subtitle={`View all ${user?.username || ""}'s captures`}
        />
        <div className="section-holder">
          {loading ? <Loader /> :
            data.map((item: Data, key) => {
              return (
                <Section
                  key={key}
                  item={item}
                  iconSubText={`capture ${item.captureMonth} months ago`}
                  userSubText="deployed 10 months ago"
                />
              );
          })}
        </div>
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
          title="Newer"
          iconPosition="right"
          className="fa fa-arrow-right"
          disabled={page <= 0}
          onClick={() => {
            setPage(page - 1);
          }}
        />
      </Stack>
    </Container>
  );
};

export default Captures;
