import './user-status.styles.scss';

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeUserStart } from '../../../redux/user/user.actions';
import CustomButton from '../../custom-button/custom-button.component';

interface UserStatusProps {
  status: string;
  editable?: boolean;
}

const UserStatus = ({ status, editable }: UserStatusProps) => {
  const dispatch = useDispatch();
  const renderedStatusText = status
    ? status
    : editable
    ? 'Изменить статус'
    : '';

  const [isEditing, setIsEditing] = useState(false);
  const statusRef = useRef(null);
  const inputRef = useRef(null);
  const [statusText, setStatusText] = useState(status || '');

  useEffect(() => {
    setStatusText(status || '');
  }, [status]);

  const statusChangeHandler = (e: any) => {
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
    if (statusRef.current && inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }

    const bodyClickHandler = (e: any) => {
      // @ts-ignore
      if (statusRef.current && statusRef.current.contains(e.target)) {
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
  }, [statusRef, inputRef]);

  useEffect(() => {
    if (statusRef.current) {
      // @ts-ignore
      statusRef.current.focus();
    }
  }, [statusRef]);

  const toggleEditingHandler = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  if (isEditing) {
    return (
      <span ref={statusRef} className="user-status user-status--editing">
        <input
          type="text"
          ref={inputRef}
          placeholder={statusText || 'Изменить статус'}
          onChange={statusChangeHandler}
          value={statusText}
          maxLength={40}
        />
        <CustomButton
          onClick={statusSaveHandler}
          className="user-status__save-button"
          inverted
        >
          Сохранить
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
