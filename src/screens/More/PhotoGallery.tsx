import React, { useState } from "react";
import "./styles.scss";
import { Container, Button } from "@mui/material";
import { PageTitle, Loader } from "../../components";
import { moreLocales } from "./moreLocales";
import PhotoGalleryMoreItem from "../../components/MorePageItems/PhotoGalleryMoreItem";
import Alert from "../../components/alerts";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";

export interface photoGalleryItemType {
  pic: string;
  large: string;
  time: string;
  location: string;
}

const userName: string = "Test User";
const PhotoGallery = (): JSX.Element => {
  const { id } = useParams();
  const { client } = React.useContext(ClientContext);

  const [photos, setPhotos] = React.useState<
    ReadonlyArray<photoGalleryItemType>
  >([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    client?.user.getPhotoGallery(currentPage, id).then((result) => {
      setHasMore(result.hasMore);
      setPhotos(result.photos);
      setLoading(false);
    });
  }, [client, currentPage]);

  const [selectedPic, setSelectedPic] = useState<photoGalleryItemType>();

  const handleSelectedPic = (info: photoGalleryItemType) => {
    setSelectedPic(info);
  };
  const getOtherPics = () => {
    return photos.map((item, index) => {
      return (
        <PhotoGalleryMoreItem
          index={index}
          onSelect={handleSelectedPic}
          {...item}
        />
      );
    });
  };

  React.useEffect(() => {
    if (photos.length > 0) {
      setSelectedPic(photos[0]);
    }
  }, [photos]);

  return (
    <Container id="photo-gallery-more">
      <PageTitle title={moreLocales.photoGalleryTitle} />
      {photos.length ? (
          loading ? <Loader /> : (
              <div className="gallery-wrapper">
                <div className="selected-pic">
                  <img src={selectedPic?.large} alt="Selected picture" />
                  <div className="selected-pic-info">
                    <span>{selectedPic?.time}</span>
                    <span>
                at <span>{selectedPic?.location}</span>{" "}
              </span>
                  </div>
                </div>
                <div className="other-pics">
                  <div className="items-wrapper">{getOtherPics()}</div>
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
                </div>
              </div>
          )
      ) : (
        <Alert type="success" align="left">
          {userName}
          {moreLocales.photoGalleryAlert}
        </Alert>
      )}
    </Container>
  );
};

export default PhotoGallery;
