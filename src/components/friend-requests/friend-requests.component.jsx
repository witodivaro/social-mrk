import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequestsStart } from "../../redux/socials/socials.actions";
import {
  selectFriendRequests,
  selectFriendRequestsErrors,
} from "../../redux/socials/socials.selectors";
import UsersList from "../users-list/users-list.component";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const friendRequests = useSelector(selectFriendRequests);
  const friendRequestsErrors = useSelector(selectFriendRequestsErrors);

  useEffect(() => {
    dispatch(getFriendRequestsStart());
  }, [dispatch, getFriendRequestsStart]);

  return (
    <UsersList
      users={friendRequests}
      friendRequests
      title="Заявки в друзья"
      emptyMessage="У вас нет заявок в друзья"
      errors={friendRequestsErrors}
    />
  );
};

export default FriendRequests;
