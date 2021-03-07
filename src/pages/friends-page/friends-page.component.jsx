import './friends-page.styles.scss';
import React, { useEffect, useState } from 'react';
import getFriendRequests from '../../apis/get-friend-requests';
import getFriends from '../../apis/get-friends';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import getSubscriptions from '../../apis/get-subscriptions';
import addToFriends from '../../apis/add-to-friends';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await getFriendRequests();

      console.log(response);
      setFriendRequests(response.data);
    };

    const fetchFriends = async () => {
      // const response = await getFriends(currentUser.id);
      // setFriends(response.data.friends);
    };

    const fetchSubscriptions = async () => {
      const response = await getSubscriptions(currentUser.id);
      console.log(response);
    };

    fetchFriends();
    fetchRequests();
    fetchSubscriptions();
  }, []);

  const renderedFriends = friends.map((friend) => (
    <li className="friends-list__item" key={`FRIEND: ${friend.id}`}>
      <p className="friends-list__friend">{friend.username}</p>
    </li>
  ));

  const friendRequestAcceptHandler = (id) => {
    addToFriends({
      id,
    });
  };

  const friendRequestRejectHandler = (id) => {
    addToFriends({
      id,
      accept: false,
    });
  };

  const renderedFriendRequests = friendRequests.map((user) => (
    <li className="friends-list__item" key={`REQUEST: ${user.id}`}>
      <p className="friends-list__friend">{user.username}</p>
      <button onClick={friendRequestAcceptHandler.bind(null, user.id)}>
        ACCEPT
      </button>
      <button onClick={friendRequestRejectHandler.bind(null, user.id)}>
        REJECT
      </button>
    </li>
  ));

  return (
    <div className="friends-page">
      <ul className="friends-page__friends-list friends-list">
        {renderedFriends}
        {renderedFriendRequests}
      </ul>
    </div>
  );
};

export default FriendsPage;
