import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectSocials = (state: RootState) => state.socials;

export const selectFriends = createSelector(
  selectSocials,
  (socials) => socials.friends
);

export const selectFriendsState = createSelector(
  selectSocials,
  (socials) => socials.friendsState
);

export const selectFriendsErrors = createSelector(
  selectSocials,
  (socials) => socials.friendsErrors
);

export const selectSubscriptions = createSelector(
  selectSocials,
  (socials) => socials.subscriptions
);

export const selectSubscriptionsState = createSelector(
  selectSocials,
  (socials) => socials.subscriptionsState
);

export const selectSubscriptionsErrors = createSelector(
  selectSocials,
  (socials) => socials.subscriptionsErrors
);

export const selectFriendRequests = createSelector(
  selectSocials,
  (socials) => socials.friendRequests
);

export const selectFriendRequestsState = createSelector(
  selectSocials,
  (socials) => socials.friendRequestsState
);

export const selectFriendRequestsErrors = createSelector(
  selectSocials,
  (socials) => socials.friendRequestsErrors
);
