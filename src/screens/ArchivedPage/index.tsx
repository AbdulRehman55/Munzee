import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import "./styles.scss";
import { PageTitle, Loader } from "../../components";
import { archivedLocales as a } from "./archivedLocales";
import ArchivedItem from "./ArchivedItem";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { itemProps } from "./ArchivedItem";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";

const ArchivedPage = (): JSX.Element => {
  const { id } = useParams();
  const { client } = React.useContext(ClientContext);

  const [archived, setArchived] = React.useState<ReadonlyArray<itemProps>>([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.user.getArchived(currentPage, id).then((result) => {
      setHasMore(result.hasMore);
      setArchived(result.munzees);
      setLoading(false);
    });
  }, [client, currentPage]);

  const getItemsPerPage = () => {
    return archived.map((item) => {
      return <ArchivedItem {...item} />;
    });
  };

  return (
    <Container id="archived-page">
      <PageTitle
        title={a.archivedTitle}
        details={`View all ${archived.length} of your archived munzees`}
      />
      <div className="archived-items">{loading ? <Loader /> : getItemsPerPage()}</div>
      <div className="btns-wrapper">
        <Button
          disabled={currentPage < 2}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ArrowBack />
          Older
        </Button>
        <Button
          disabled={!hasMore}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Newer
          <ArrowForward />
        </Button>
      </div>
    </Container>
  );
};

export default ArchivedPage;
