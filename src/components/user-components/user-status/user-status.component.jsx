import './user-status.styles.scss';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeUserStart } from '../../../redux/user/user.actions';
import CustomButton from '../../custom-button/custom-button.component';

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
      <span
        ref={(elemRef) => setStatusRef(elemRef)}
        className="user-status user-status--editing"
      >
        <input
          type="text"
          placeholder={statusText || 'Изменить статус'}
          onChange={statusChangeHandler}
          value={statusText}
        />
        <CustomButton
          onClick={statusSaveHandler}
          className="user-status__save-button"
          inverted
        >
          Save
        </CustomButton>
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
