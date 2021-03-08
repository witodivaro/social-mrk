import './page-not-found.styles.scss';
import React from 'react';
import { ReactComponent as NotFound } from '../../assets/images/not-found.svg';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <p className="page-not-found__svg-container">
        <NotFound className="page-not-found__svg" />
      </p>
      <h1 className="page-not-found__title">Пользователь не найден</h1>
      <p className="page-not-found__details">Скорее всего, его попросту нет</p>
    </div>
  );
};

export default PageNotFound;
