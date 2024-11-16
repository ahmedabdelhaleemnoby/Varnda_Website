import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function DescoverySection({ linkTo, heading, paragraph }) {
  return (
    <Link to={linkTo} className="link">
      <div className="select-home">
        <h2 className="fs-1">{heading}</h2>
        <p className="fs-5 my-3">{paragraph}</p>
        <Button className="start-search">اعرض الأن</Button>
      </div>
    </Link>
  );
}
