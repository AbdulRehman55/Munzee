import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Button, Container, Link } from "@mui/material";
import { Apple, Android } from "@mui/icons-material";
import "./styles.scss";
import mainBanner from "../../assets/images/main_banner.png";
import sliderHeader from "../../assets/images/slider_header.png";
import sliderItem1 from "../../assets/images/slider_item_1.png";
import sliderItem2 from "../../assets/images/slider_item_2.png";
import sliderItem3 from "../../assets/images/slider_item_3.png";
import sliderItem4 from "../../assets/images/slider_item_4.png";
import { text } from "../../utils/locales/all_pages";

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const images = [sliderItem1, sliderItem2, sliderItem3, sliderItem4];
  const sliderItems = (): JSX.Element[] => {
    const items = [];
    for (let i = 0; i < images.length; i++) {
      items.push(
        <Container>
          <img src={images[i]} alt="Slider Item" />
        </Container>
      );
    }
    return items;
  };

  return (
    <main id="home_page_content">
      <div className="main-banner">
        <div className="main-banner-wrapper content-wrapper">
          <img src={mainBanner} alt="Main banner" />
        </div>
      </div>
      <div className="available-info-line">
        <div className="available-info-line-wrapper content-wrapper">
          <span>123,123,123 Captures worldwide</span>
          <div className="available_links">
            <span>{text.homepage.available_on}</span>
            <Link href="https://go.onelink.me/app/1a78f7a9">
              <Apple style={{ fontSize: "35px" }} />
            </Link>
            <Link href="https://go.onelink.me/app/f0dec1d3">
              <Android style={{ fontSize: "35px" }} />
            </Link>
          </div>
        </div>
      </div>
      <div className="inner-wrapper">
        <h3>{text.homepage.banner_title}</h3>
        <div className="desc_1">{text.homepage.desc_1}</div>
        <p className="desc_2">{text.homepage.desc_2}</p>
        <div className="video-wrapper">
          <iframe src="https://www.youtube.com/embed/KjCMTaVOqO0" />
        </div>
        <div className="desc_3">
          With over <a href="">8 million deployed worldwide</a>, there is bound
          to be a munzee hiding nearby!
        </div>
        <div className="whats_new_wrapper inner-wrapper">
          <img src={sliderHeader} alt="Slider header" />
          <div className="whats_new_slider">
            <Carousel
              navButtonsAlwaysVisible={true}
              indicators={false}
              sx={{ padding: "0 !important" }}
            >
              {sliderItems()}
            </Carousel>
          </div>
        </div>
        <div className="desc_4">
          Sign up to try Munzee for <span>FREE</span>!
        </div>
        <div className="buttons-wrapper">
          <Button
            className="download-button-content"
            onClick={() => navigate("/download")}
          >
            Download App
          </Button>
          <Button
            onClick={() => navigate("/m/id")}
            className="login-button-content"
          >
            Login
          </Button>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
