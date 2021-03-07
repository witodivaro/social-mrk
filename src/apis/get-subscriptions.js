import socialMrk from './social-mrk';

const getSubscriptionsEndpoint = '/user-actions/get-subscriptions/';

const getSubscriptions = (id) => {
  return socialMrk.get(getSubscriptionsEndpoint, {
    id,
  });
};

export default getSubscriptions;
