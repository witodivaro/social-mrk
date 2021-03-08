import { createSelector } from 'reselect';

const selectSocials = (state) => state.socials;

export const selectFriends = createSelector(
  selectSocials,
  (socials) => socials.friends
);

export const selectSubscriptions = createSelector(
  selectSocials,
  (socials) => socials.subscriptions
);

export const selectFriendRequests = createSelector(
  selectSocials,
  (socials) => socials.friendRequests
);
