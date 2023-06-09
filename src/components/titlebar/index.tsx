import React from 'react';
import './styles.scss';

interface Iprops {
  bgColor: string;
  title: string;
  details: string;
  startText? : string
}

const TitleBar = ({ bgColor, title, details, startText }: Iprops): JSX.Element => {
  return (
    <div className={`titlebar ${bgColor}`}>
      {startText && <p>{startText}</p>}
      <h5>{title}</h5>
      <p>{details}</p>
    </div>
  );
};

export default TitleBar;
