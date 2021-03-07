import './user-avatar-picker-modal.scss';

import React, { useEffect, useRef } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleAvatarModalShown } from '../../../redux/user-page/user-page.actions';
import { changeUserStart } from '../../../redux/user/user.actions';

const UserAvatarPickerModal = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'unset';
    };
  }, []);

  const imageChangeHandler = (e) => {
    const reader = new FileReader();

    reader.onload = async () => {
      dispatch(
        changeUserStart({
          image: reader.result,
        })
      );
      dispatch(toggleAvatarModalShown());
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const toggleAvatarModalHandler = () => {
    dispatch(toggleAvatarModalShown());
  };

  return (
    <section className="user-avatar-picker-modal">
      <div
        className="user-avatar-picker-modal__overlay"
        onClick={toggleAvatarModalHandler}
      ></div>
      <div className="user-avatar-picker-modal__container">
        <div className="user-avatar-picker-modal__card">
          <header className="user-avatar-picker-modal__header">
            <span>Выберите изображение</span>
            <button
              onClick={toggleAvatarModalHandler}
              className="user-avatar-picker-modal__close-button"
            >
              <FaTimes size={20} />
            </button>
          </header>
          <p className="user-avatar-picker-modal__image-selector">
            <label htmlFor="avatar-pick">
              <FaImage size={120} />
            </label>
            <input
              ref={inputRef}
              id="avatar-pick"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={imageChangeHandler}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserAvatarPickerModal;
