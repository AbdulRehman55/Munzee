import React from 'react';
import './styles.scss';

interface Iprops {
  iconClass: string;
  title: string;
  details: string;
  link?: string;
  linkText?: string;
}

const DetailCard = ({
  iconClass,
  title,
  details,
  link,
  linkText,
}: Iprops): JSX.Element => {
  return (
    <div className='detailCard'>
      <div>
        <i className={iconClass} />
      </div>
      <h4>{title}</h4>
      <p>{details}</p>
      <a href={link}>{linkText}</a>
    </div>
  );
};

export default DetailCard;
