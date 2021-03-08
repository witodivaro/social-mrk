import './friends.styles.scss';

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

  const renderedFriends = useMemo(
    () =>
      friends.length > 0 ? (
        <UsersList users={friends} />
      ) : (
        <p className="friends__empty">Ваш список друзей пуст</p>
      ),
    [friends]
  );

  return <div className="friends">{renderedFriends}</div>;
};

export default Friends;
