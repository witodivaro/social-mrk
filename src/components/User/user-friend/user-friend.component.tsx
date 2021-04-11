import './user-friend.styles.scss';
import { useMemo, MouseEvent } from 'react';
import CustomButton from '../../custom-button/custom-button.component';
import { ReactComponent as NoAvatar } from '../../../assets/images/no-avatar.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import {
  addFriendStart,
  removeFriendStart,
  unsubscribeStart,
} from '../../../redux/socials/socials.actions';
import { UserFriend as UserFriendType } from '../../../types/redux/user/User';
import AddToFriendsButton from '../../Interactive/add-to-friends-button/add-to-friends-button.component';
import { FaTimes, FaUserPlus, FaUserAltSlash } from 'react-icons/fa';
import { USER_RELATIONS } from '../../../config/user-relations';
import { selectUnsubscribeState } from '../../../redux/socials/socials.selectors';
import UnsubscribeButton from '../../Interactive/unsubscribe-button/unsubscribe-button.component';
import RemoveFromFriendsButton from '../../Interactive/remove-from-friends/remove-from-friends-button.component';

interface UserFriendsProps {
  user: UserFriendType;
}

const UserFriend = ({ user }: UserFriendsProps) => {
  const { id, image, username, relation } = user;
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const unsubscribeState = useSelector(selectUnsubscribeState);

  const removeFromFriendsHandler = (e: MouseEvent): void => {
    e.preventDefault();
    dispatch(removeFriendStart(id));
  };

  const renderedUserAvatar = useMemo(
    (): JSX.Element =>
      image ? (
        <p
          className="friends__avatar"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ) : (
        <NoAvatar className="friends__avatar" />
      ),
    [user]
  );

  const renderedAction = useMemo((): JSX.Element | null => {
    if (currentUserId === id) {
      return null;
    }

    if (relation === USER_RELATIONS.FRIEND) {
      return (
        <RemoveFromFriendsButton id={id} className="friends__action">
          <FaTimes />
        </RemoveFromFriendsButton>
      );
    } else if (relation === USER_RELATIONS.SUBSCRIPTION) {
      return (
        <UnsubscribeButton id={id} className="friends__action" inverted>
          <FaUserAltSlash />
        </UnsubscribeButton>
      );
    }

    return (
      <AddToFriendsButton
        className="friends__action"
        id={id}
        inverted
        isSent={relation === USER_RELATIONS.REQUESTED}
      >
        <FaUserPlus />
      </AddToFriendsButton>
    );
  }, [relation, currentUserId, id, removeFromFriendsHandler]);

  return (
    <li className="friends__item">
      <Link to={`id${id}`} className="friends__link">
        {renderedUserAvatar}
        <span className="friends__name">{username}</span>
        <div className="friends__actions">{renderedAction}</div>
      </Link>
    </li>
  );
};

export default UserFriend;
