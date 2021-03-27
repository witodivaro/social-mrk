import './user-avatar.styles.scss';

import { useMemo, useCallback, useRef } from 'react';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { useDispatch } from 'react-redux';
import { toggleAvatarModalShown } from '../../../redux/user-page/user-page.actions';
import { FaTimes } from 'react-icons/fa';
import { changeUserStart } from '../../../redux/user/user.actions';

interface UserAvatarProps {
  imageSource: string;
  editable: boolean;
}

const UserAvatar = ({ imageSource, editable }: UserAvatarProps) => {
  const dispatch = useDispatch();
  const closeButtonRef = useRef();

  const clearAvatarHandler = useCallback(() => {
    dispatch(
      changeUserStart({
        image: null,
      })
    );
  }, []);

  const toggleAvatarModalHandler = (e: MouseEvent) => {
    if (!closeButtonRef || !closeButtonRef.current) {
      return;
    }

    // @ts-ignore
    if (closeButtonRef.current.contains(e.target)) {
      return;
    }

    if (!editable) {
      return;
    }

    dispatch(toggleAvatarModalShown());
  };

  const renderedClearButton = useMemo(
    (): JSX.Element | null =>
      editable && imageSource ? (
        <button
          // @ts-ignore
          ref={closeButtonRef}
          className="avatar__clear-button"
          onClick={clearAvatarHandler}
        >
          <FaTimes size={20} />
        </button>
      ) : null,
    [imageSource, editable]
  );

  const renderedAvatarOverlay = useMemo(
    (): JSX.Element | null =>
      editable ? (
        <p
          className={`avatar__overlay ${
            imageSource ? 'avatar__overlay--editable' : ''
          }`}
          // @ts-ignore
          onClick={toggleAvatarModalHandler}
        >
          {imageSource
            ? 'Редактировать изображение'
            : 'Нажмите на аватар, чтобы выбрать изображение'}
        </p>
      ) : null,
    [editable, imageSource, toggleAvatarModalHandler]
  );

  const renderedImage = imageSource ? (
    <img className="avatar__img" src={imageSource} />
  ) : (
    <NoAvatar
      className={`avatar__svg ${editable ? 'avatar__svg--editable' : ''}`}
      // @ts-ignore
      onClick={toggleAvatarModalHandler}
    />
  );

  return (
    <div className={`avatar ${editable ? 'avatar--editable' : ''}`}>
      {renderedImage}
      {renderedClearButton}
      {renderedAvatarOverlay}
    </div>
  );
};

export default UserAvatar;
