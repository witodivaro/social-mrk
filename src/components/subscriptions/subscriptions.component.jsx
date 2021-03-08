import './subscriptions.styles.scss';

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

  const renderedSubscriptions = useMemo(
    () =>
      subscriptions.length > 0 ? (
        <UsersList users={subscriptions} />
      ) : (
        <p className="subscriptions__empty">Ваш список подписчиков пуст</p>
      ),
    [subscriptions]
  );

  return <div className="subscriptions">{renderedSubscriptions}</div>;
};

export default Subscriptions;
