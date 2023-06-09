import React from "react";
import "./style.scss";

export interface Data {
  iconLink?: string;
  iconName?: string;
  captureMonth?: string;
  userLink?: string;
  points?: number;
  userName?: string;
  deployedYear?: string;
  avatar?: string;
  iconImg?: string;
}

export interface Iprops {
  key: number;
  item: Data;
  iconSubText: string;
  iconCapText?: string;
  userSubText: string;
}

const Section = ({
  key,
  item,
  iconSubText,
  iconCapText,
  userSubText,
}: Iprops): JSX.Element => {
  return (
    <div className="section-container">
      <section key={key}>
        <div className="munzee-name pull-left">
          <a href={item.iconLink}>
            <img className="pin" src={item.iconImg} />
          </a>
          <a className="munzee-id" href="/m/RedCarRobbie/12/">
            {item.iconName}
          </a>
        </div>
        <div className="subtext captext pull-left">
          {iconSubText}
          <br />
          {iconCapText}
        </div>
        <div className="stat">
          <div className="number">{item.points}</div>
          <div className="desc">points</div>
        </div>
        <div className="munzee-creator pull-right">
          <div className="pull-left">
            <a href={item.userLink}>
              <img className="user-photo" src={item.avatar} />
            </a>
            <div className="subtext pull-left">{userSubText}</div>
            <div className="subuser pull-left">
              by <a href={item.userLink}>{item.userName}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Section;
