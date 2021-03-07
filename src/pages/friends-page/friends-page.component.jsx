import './friends-page.styles.scss';
import React from 'react';

const friends = [
  { username: 'lol', id: 1 },
  { username: 'lol', id: 2 },
  { username: 'lol', id: 3 },
  { username: 'lol', id: 4 },
];

const FriendsPage = () => {
  const renderedFriends = friends.map((friend) => (
    <li className="friends-list__item" key={friend.id}>
      <p className="friends-list__friend">{friend.username}</p>
    </li>
  ));

  return (
    <div className="friends-page">
      <ul className="friends-page__friends-list friends-list">
        {renderedFriends}
      </ul>
    </div>
  );
};

export default FriendsPage;
