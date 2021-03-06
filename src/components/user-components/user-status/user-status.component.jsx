import './user-status.styles.scss';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeUserStart } from '../../../redux/user/user.actions';

const UserStatus = ({ status, editable }) => {
  const dispatch = useDispatch();
  const renderedStatusText = status
    ? status
    : editable
    ? 'Изменить статус'
    : '';

  const [isEditing, setIsEditing] = useState(false);
  const [statusRef, setStatusRef] = useState(null);
  const [statusText, setStatusText] = useState(status || '');

  const statusChangeHandler = (e) => {
    setStatusText(e.target.value);
  };

  const statusSaveHandler = () => {
    console.log(1);
    setIsEditing(false);
    dispatch(
      changeUserStart({
        status: statusText,
      })
    );
  };

  useEffect(() => {
    const bodyClickHandler = (e) => {
      if (statusRef && statusRef.contains(e.target)) {
        return;
      }

      setIsEditing(false);
    };

    document.body.addEventListener('click', bodyClickHandler, {
      capture: true,
    });

    return () => {
      document.body.removeEventListener('click', bodyClickHandler, {
        capture: true,
      });
    };
  }, [statusRef]);

  useEffect(() => {
    if (statusRef) {
      statusRef.focus();
    }
  }, [statusRef]);

  const toggleEditingHandler = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  if (isEditing) {
    return (
      <span ref={(elemRef) => setStatusRef(elemRef)} className="user-status">
        <input
          type="text"
          className="user-status--editing"
          placeholder={statusText || 'Изменить статус'}
          onChange={statusChangeHandler}
          value={statusText}
        />
        <button onClick={statusSaveHandler}>Save</button>
      </span>
    );
  }

  return (
    <span
      onClick={toggleEditingHandler}
      className={`user-status ${editable ? 'user-status--editable' : ''}`}
    >
      {renderedStatusText}
    </span>
  );
};

export default UserStatus;
