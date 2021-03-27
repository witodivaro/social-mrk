import './user-avatar-picker-modal.scss';

import { useEffect, useRef } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleAvatarModalShown } from '../../../redux/user-page/user-page.actions';
import {
  changeUserStart,
  compressAndChangeUserAvatar,
} from '../../../redux/user/user.actions';

const UserAvatarPickerModal = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'unset';
    };
  }, []);

  const imageChangeHandler = (e: any) => {
    const imageFile = e.target.files[0];

    dispatch(compressAndChangeUserAvatar(imageFile));
    dispatch(toggleAvatarModalShown());
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
              accept="image/jpeg,image/png"
              onChange={imageChangeHandler}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserAvatarPickerModal;
