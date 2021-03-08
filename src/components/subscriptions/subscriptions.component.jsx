import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../users-list/users-list.component';
import { selectSubscriptions } from '../../redux/socials/socials.selectors';
import { getSubscriptionsStart } from '../../redux/socials/socials.actions';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(selectSubscriptions);

  useEffect(() => {
    dispatch(getSubscriptionsStart(0));
  }, []);

  return (
    <UsersList
      users={subscriptions}
      title="Подписчики"
      emptyMessage="У вас нет подписчиков"
    />
  );
};

export default Subscriptions;
