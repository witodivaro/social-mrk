import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsStart } from '../../../redux/socials/socials.actions';
import {
  selectFriends,
  selectFriendsErrors,
} from '../../../redux/socials/socials.selectors';
import UsersList from '../../users-list/users-list.component';

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const friendsErrors = useSelector(selectFriendsErrors);

  useEffect(() => {
    dispatch(getFriendsStart(0));
  }, [dispatch, getFriendsStart]);

  return (
    <UsersList
      users={friends}
      title="Друзья"
      emptyMessage="Ваш список друзей пуст"
      errors={friendsErrors}
      friends
    />
  );
};

export default Friends;
