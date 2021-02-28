import './user-friends.styles.scss';
import React, { useState } from 'react';
import UserFriend from '../user-friend/user-friend.component';
import { useSelector } from 'react-redux';
import CustomButton from '../../custom-button/custom-button.component';

const users = [
  {
    id: 1,
    username: 'genius',
    avatarUrl: 'url',
  },
  {
    id: 2,
    username: 'wito divaro',
    avatarUrl: 'url',
  },
  {
    id: 3,
    username: 'geniass',
    avatarUrl: 'url',
  },
  {
    id: 4,
    username: 'geniass',
    avatarUrl: 'url',
  },
  {
    id: 5,
    username: 'geniass',
    avatarUrl: 'url',
  },
  {
    id: 6,
    username: 'geniass',
    avatarUrl: 'url',
  },
];

const SHOWN_FRIENDS_COUNT = 5;

const UserFriends = ({ className }) => {
  const [showFriends, setShowFriends] = useState(false);
  const [shownFriendsCount, setShownFriendsCount] = useState(
    SHOWN_FRIENDS_COUNT
  );

  const toggleFriendsShowHandler = () => {
    setShowFriends((showFriends) => !showFriends);
  };

  const renderFriends = (friendsCount) =>
    users
      .slice(0, friendsCount)
      .map((user) => <UserFriend key={`UF${user.id}`} user={user} />);

  const renderedShowMoreButton = showFriends ? (
    <p className="friends__show-more-container">
      <CustomButton>More</CustomButton>
    </p>
  ) : null;

  const renderedFriendsList = (
    <>
      <ul className={`friends__list ${showFriends ? 'show' : ''}`}>
        {renderFriends(shownFriendsCount)}
      </ul>
      {renderedShowMoreButton}
    </>
  );

  return (
    <article className={`friends ${className}`}>
      <h3 className="friends__title" onClick={toggleFriendsShowHandler}>
        Friends ({users.length})
      </h3>
      {renderedFriendsList}
    </article>
  );
};

export default UserFriends;
