import React from "react";
import "./styles.scss";
import { Container, PageTitle } from "../../components";

const AuthorizedRetail = (): JSX.Element => {
  return (
    <Container>
      <div className="authorized-retail-container">
        <PageTitle title="Authorized Retail Outlets" />
        <h3>Australia & New Zealand</h3>
        <ul className="list-unstyled">
          <li></li>
          <li>
            GEOLoggers
            <a href="http://www.geologgers.com/shop" target="_new">
              {" - "}www.geologgers.com/shop
            </a>
          </li>
        </ul>
        <h3>United Kingdom / Europe</h3>
        <ul className="list-unstyled">
          <li>
            <i className="fa fa-building-o fa-lg"></i>
            <a
              style={{ padding: "0 5px" }}
              href="https://www.google.com/maps/place/NE+Geocaching+Supplies/@54.4843261,-1.547447,17z/data=!3m1!4b1!4m5!3m4!1s0x487e990ea658a2d1:0x69f0d3f74dc0cd97!8m2!3d54.484323!4d-1.545253"
              target="_new"
            >
              <i className="fa fa-map-marker fa-lg"></i>
            </a>
            NE Geocaching Supplies UK
            <a href="http://www.negeocachingsupplies.co.uk" target="_new">
              {" - "}www.negeocachingsupplies.co.uk
            </a>
          </li>
        </ul>
        <h3>United States</h3>
        <ul className="list-unstyled">
          <li>
            <i className="fa fa-building-o fa-lg"></i>
            <a
              style={{ padding: "0 5px" }}
              href="https://www.google.com/maps/place/Gold'n+Coins+%26+Jewelry/@33.93955,-117.951413,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x1c6943b229d9cd73"
              target="_new"
            >
              <i className="fa fa-map-marker fa-lg"></i>
            </a>
            Gold'n Coins -
            <a href="https://www.goldncoins.com" target="_new">
              www.goldncoins.com
            </a>
          </li>
          <li>
            Space Coast Geocaching Store -{" "}
            <a
              href="https://spacecoastgeostore.com/collections/munzee-items"
              target="_new"
            >
              https://spacecoastgeostore.com
            </a>
          </li>
        </ul>
        <hr />
        <ul className="list-unstyled">
          <i>
            <li className="font-italic">
              <i className="fa fa-building-o fa-lg"></i>
              {' '}denotes a physical location
            </li>
          </i>
          <i>
            <li className="font-italic">
              <i className="fa fa-map-marker fa-lg"></i>
              {' '}map of location
            </li>
          </i>
        </ul>
      </div>
    </Container>
  );
};

export default AuthorizedRetail;
