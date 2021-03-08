import './friend-requests.styles.scss';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequestsStart } from '../../redux/socials/socials.actions';
import { selectFriendRequests } from '../../redux/socials/socials.selectors';
import UsersList from '../users-list/users-list.component';

const FriendRequests = () => {
  const dispatch = useDispatch();
  const friendRequests = useSelector(selectFriendRequests);

  useEffect(() => {
    dispatch(getFriendRequestsStart());
  }, []);

  const renderedFriendRequests = useMemo(
    () =>
      friendRequests.length > 0 ? (
        <UsersList users={friendRequests} isFriendRequest />
      ) : (
        <p className="friend-requests__empty">У вас нет запросов в друзья</p>
      ),
    [friendRequests]
  );

  return <div className="friend-requests">{renderedFriendRequests}</div>;
};

export default FriendRequests;
