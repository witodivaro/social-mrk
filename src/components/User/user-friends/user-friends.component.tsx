import './user-friends.styles.scss';
import { useState } from 'react';
import CustomButton from '../../custom-button/custom-button.component';
import { UserFriend as UserFriendType } from '../../../types/redux/user/User';
import UserFriend from '../user-friend/user-friend.component';

const SHOWN_FRIENDS_COUNT = 5;
const TABLET_WIDTH = 700;

interface UserFriendsProps {
  friends: UserFriendType[];
  className?: string;
}

const UserFriends = ({ friends, className }: UserFriendsProps) => {
  const [showFriends, setShowFriends] = useState(false);
  const [shownFriendsCount, setShownFriendsCount] = useState(
    SHOWN_FRIENDS_COUNT
  );

  const toggleFriendsShowHandler = () => {
    if (document.body.clientWidth >= TABLET_WIDTH) {
      return;
    }
    setShowFriends((showFriends) => !showFriends);
  };

  if (friends.length === 0) {
    return null;
  }

  const renderFriends = (friendsCount: number): JSX.Element[] =>
    friends
      .slice(0, friendsCount)
      .map((user) => <UserFriend key={`UF${user.id}`} user={user} />);

  const renderedShowMoreButton =
    showFriends && shownFriendsCount < friends.length ? (
      <p className="user-friends__show-more-container">
        <CustomButton>More</CustomButton>
      </p>
    ) : null;

  const renderedFriendsList = (
    <>
      <ul className={`user-friends__list  ${showFriends ? 'show' : ''}`}>
        {renderFriends(shownFriendsCount)}
      </ul>
      {renderedShowMoreButton}
    </>
  );

  return (
    <article className={`user-friends ${className}`}>
      <h3 className="user-friends__title" onClick={toggleFriendsShowHandler}>
        Друзья ({friends.length})
      </h3>
      {renderedFriendsList}
    </article>
  );
};

export default UserFriends;
