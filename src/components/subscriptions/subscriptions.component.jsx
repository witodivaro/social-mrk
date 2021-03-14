import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../users-list/users-list.component';
import {
  selectSubscriptions,
  selectSubscriptionsErrors,
} from '../../redux/socials/socials.selectors';
import { getSubscriptionsStart } from '../../redux/socials/socials.actions';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(selectSubscriptions);
  const subscriptionsErrors = useSelector(selectSubscriptionsErrors);

  useEffect(() => {
    dispatch(getSubscriptionsStart(0));
  }, []);

  return (
    <UsersList
      users={subscriptions}
      title="Подписчики"
      emptyMessage="У вас нет подписчиков"
      errors={subscriptionsErrors}
    />
  );
};

export default Subscriptions;
