import './user-preview.styles.scss';
import { useCallback, useMemo } from 'react';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import CustomButton from '../../custom-button/custom-button.component';
import { useDispatch } from 'react-redux';
import { FaTimes, FaCheck } from 'react-icons/fa';
import {
  acceptFriendRequestStart,
  rejectFriendRequestStart,
} from '../../../redux/socials/socials.actions';
import { User } from '../../../types/redux/user/User';

interface UserPreviewProps {
  user: User;
  isFriendRequest?: boolean;
}

const UserPreview = ({ user, isFriendRequest }: UserPreviewProps) => {
  const { image, username, id } = user;
  const dispatch = useDispatch();

  const acceptFriendHandler = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(acceptFriendRequestStart(id));
  };

  const rejectFriendHandler = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(rejectFriendRequestStart(id));
  };

  const renderedUserAvatar = useMemo(
    () =>
      image ? (
        <p
          className="user-preview__avatar"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ) : (
        <NoAvatar className="user-preview__avatar" />
      ),
    [image]
  );

  const renderActions = useCallback((): JSX.Element | null => {
    if (isFriendRequest) {
      return (
        <>
          <CustomButton
            inverted
            className="user-preview__action"
            onClick={acceptFriendHandler}
            aria-label="Принять заявку в друзья"
          >
            <FaCheck />
          </CustomButton>
          <CustomButton
            inverted
            className="user-preview__action"
            onClick={rejectFriendHandler}
            aria-label="Отклонить заявку в друзья"
          >
            <FaTimes />
          </CustomButton>
        </>
      );
    }

    return null;
  }, [isFriendRequest]);

  return (
    <Link to={`/id${id}`} className="user-preview">
      {renderedUserAvatar}
      <span className="user-preview__name">{username}</span>
      <div className="user-preview__actions">{renderActions()}</div>
    </Link>
  );
};

export default UserPreview;
