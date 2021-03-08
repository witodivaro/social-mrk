import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsStart } from '../../redux/socials/socials.actions';
import { selectFriends } from '../../redux/socials/socials.selectors';
import UsersList from '../users-list/users-list.component';

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(getFriendsStart(0));
  }, []);

  return (
    <UsersList
      users={friends}
      title="Друзья"
      emptyMessage="Ваш список друзей пуст"
    />
  );
};

export default Friends;
