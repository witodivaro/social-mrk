import socialMrk from './social-mrk';

const getSubscriptionsEndpoint = '/user-actions/get-subscriptions/';

const getSubscriptions = (id) => {
  return socialMrk.get(getSubscriptionsEndpoint, {
    params: {
      id,
    },
  });
};

export default getSubscriptions;
