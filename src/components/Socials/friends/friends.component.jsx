import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsStart } from '../../../redux/socials/socials.actions';
import {
  selectFriends,
  selectFriendsErrors,
  selectFriendsUpdated,
} from '../../../redux/socials/socials.selectors';
import UsersList from '../../users-list/users-list.component';

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const friendsErrors = useSelector(selectFriendsErrors);
  const friendsUpdated = useSelector(selectFriendsUpdated);

  useEffect(() => {
    if (friendsUpdated) return;

    dispatch(getFriendsStart(0));
  }, [dispatch, getFriendsStart, friendsUpdated]);

  return (
    <UsersList
      users={friends}
      title="Друзья"
      emptyMessage="Ваш список друзей пуст"
      errors={friendsErrors}
    />
  );
};

export default Friends;
