import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsStart } from '../../../redux/socials/socials.actions';
import {
  selectFriends,
  selectFriendsErrors,
} from '../../../redux/socials/socials.selectors';
import { selectCurrentUserId } from '../../../redux/user/user.selectors';
import UsersList from '../../users-list/users-list.component';

interface FriendsProps {
  id: number;
}

const Friends = ({ id }: FriendsProps) => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const friendsErrors = useSelector(selectFriendsErrors);

  useEffect(() => {
    dispatch(getFriendsStart(id));
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
