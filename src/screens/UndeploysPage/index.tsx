import React, { useEffect, useState } from "react";
import "./styles.scss";
import UndeploysItem from "./UndeploysItem";
import { undeploysLocales as u } from "./undeploysLocales";
import { Button, Container, Link } from "@mui/material";
import { PageTitle } from "../../components";
import SearchTypes from "./SearchTypes";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { QrCode } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import Backend, { UserInfo } from "../../munzee-backend";
import { Munzee } from "../../munzee-backend/types";

const UndeploysPage = (): JSX.Element => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { backend, user, publicProfile } = React.useContext(ClientContext);

  let isValidUser =
    user != undefined &&
    user != null &&
    publicProfile != undefined &&
    publicProfile != null;
  if (isValidUser) {
    isValidUser = user?.userId == publicProfile?.userId && user?.premium == 1;
    if (!isValidUser) {
      navigate("/m/" + publicProfile?.username);
    }
  }

  if (isValidUser) {
    return (
      <UndeploysPageForValidUser
        key={`${type}`}
        backend={backend}
        user={user}
        type={type}
      />
    );
  } else {
    return <Container id="undelpoys-page"></Container>;
  }
};

const UndeploysPageForValidUser = ({
  backend,
  user,
  type,
}: {
  backend: Backend | null;
  user: UserInfo | null;
  type?: string;
}): JSX.Element => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [undeployMunzees, setUndeployMunzees] = useState<Munzee[]>([]);

  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const apiUndeploys = async () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    const result =
      searchText.length < 3
        ? await backend?.user.userUndeploys({
            user_id: user?.userId ?? 0,
            page: currentPage,
            type_id: type,
          })
        : await backend?.user.userUndeploysSearch({
            user_id: user?.userId ?? 0,
            page: currentPage,
            text: searchText,
            type_id: type,
          });
    const isHasMorePage = result?.has_more == 1;

    let array: Munzee[] = [];
    result?.munzees.forEach((munzee) => {
      array.push(munzee);
    });
    setUndeployMunzees(array);
    setIsLastPage(!isHasMorePage);
    setIsFetching(false);
  };

  useEffect(() => {
    apiUndeploys();
  }, [currentPage]);

  useEffect(() => {
    if (searchText.length > 2) {
      setIsSearch(true);
      if (currentPage == 0) {
        apiUndeploys();
      } else {
        setCurrentPage(0);
      }
    }
  }, [searchText]);

  const actionSearch = (txtSearch: string) => {
    setSearchText(txtSearch);
  };

  const getItemsPerPage = () => {
    if (undeployMunzees.length) {
      return undeployMunzees.map((item) => {
        return <UndeploysItem {...item} />;
      });
    } else {
      return <></>;
      // return <>{a.noItems}</>
    }
  };

  return (
    <Container id="undelpoys-page">
      <Button
        className="create-btn"
        onClick={() => {
          navigate("/create");
        }}
      >
        {u.createBtn}
      </Button>
      <PageTitle
        title={"Undeployments"}
        details={`View all ${
          user?.numberOfDeployments ?? 0
        } of your undeployed munzees`}
      />

      <SearchTypes actionSearch={actionSearch} />

      {!isFetching && !isLastPage && undeployMunzees.length > 0 && (
        <div className="alert alert-success text-center">
          There are even more results. Please try a more detailed search phrase.
        </div>
      )}
      {!isFetching && undeployMunzees.length == 0 && (
        <div className="alert alert-danger text-center">
          Nothing found. Please try a less detailed search phrase or don't
          filter for a specific type.
        </div>
      )}

      <div className="undeploys-items">{getItemsPerPage()}</div>

      {!isSearch && (
        <div className="btns-wrapper">
          <Button
            disabled={isLastPage}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ArrowBack />
            {u.olderBtn}
          </Button>
          <Button onClick={() => navigate("/print")} className="print-btn">
            <QrCode />
            {u.batchPrint}
          </Button>
          <Button
            disabled={currentPage < 2}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {u.newerBtn}
            <ArrowForward />
          </Button>
        </div>
      )}
    </Container>
  );
};

export default UndeploysPage;
