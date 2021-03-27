import { AnyAction } from 'redux';
import {
  ADD_FRIEND_STATES,
  GET_FRIENDS_STATES,
  GET_FRIEND_REQUESTS_STATES,
  GET_SUBSCRIPTIONS_STATES,
} from '../../config/socials-states';
import {
  UserFriend,
  UserFriendRequest,
  UserSubscription,
} from '../../types/redux/user/User';
import { SocialsActionTypes } from './socials.types';
import { moveUserBetweenSocials } from './socials.utils';

interface SocialsState {
  friends: UserFriend[];
  subscriptions: UserSubscription[];
  friendRequests: UserFriendRequest[];
  getFriendsState: string;
  getFriendsError: null;
  getSubscriptionsState: string;
  getSubscriptionsError: null;
  getFriendRequestsState: string;
  getFriendRequestsError: null;
  addFriendState: string;
}

const initialState: SocialsState = {
  friends: [],
  subscriptions: [],
  friendRequests: [],
  getFriendsState: '',
  getFriendsError: null,
  getSubscriptionsState: '',
  getSubscriptionsError: null,
  getFriendRequestsState: '',
  getFriendRequestsError: null,
  addFriendState: '',
};

const socialsReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SocialsActionTypes.GET_FRIENDS_START:
      return {
        ...state,
        getFriendsState: GET_FRIENDS_STATES.FETCHING,
        getFriendsError: null,
      };

    case SocialsActionTypes.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
        getFriendsState: GET_FRIENDS_STATES.SUCCESS,
        getFriendsError: null,
      };

    case SocialsActionTypes.GET_FRIENDS_FAILURE:
      return {
        ...state,
        getFriendsState: GET_FRIENDS_STATES.FAILURE,
        getFriendsError: payload.errors,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_START:
      return {
        ...state,
        getFriendRequestsState: GET_FRIEND_REQUESTS_STATES.FETCHING,
        friendRequestsErrors: null,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        getFriendRequestsState: GET_FRIEND_REQUESTS_STATES.SUCCESS,
        friendRequestsErrors: null,
        friendRequests: payload.friendRequests,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_FAILURE:
      return {
        ...state,
        getFriendRequestsState: GET_FRIEND_REQUESTS_STATES.FAILURE,
        friendRequestsErrors: payload.errors,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_START:
      return {
        ...state,
        getSubscriptionsState: GET_SUBSCRIPTIONS_STATES.FETCHING,
        getSubscriptionsError: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: payload.subscriptions,
        getSubscriptionsState: GET_SUBSCRIPTIONS_STATES.SUCCESS,
        getSubscriptionsError: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        getSubscriptionsState: GET_SUBSCRIPTIONS_STATES.FAILURE,
        getSubscriptionsError: payload.errors,
      };

    case SocialsActionTypes.ADD_FRIEND_START:
      return {
        ...state,
        addFriendState: ADD_FRIEND_STATES.FETCHING,
      };

    case SocialsActionTypes.ADD_FRIEND_SUCCESS:
      return {
        ...state,
        addFriendState: ADD_FRIEND_STATES.SUCCESS,
      };

    case SocialsActionTypes.ADD_FRIEND_FAILURE:
      return {
        ...state,
        addFriendState: ADD_FRIEND_STATES.FAILURE,
      };

    case SocialsActionTypes.REJECT_FRIEND_REQUEST_LOCAL:
      const reqToSubs = moveUserBetweenSocials<
        UserFriendRequest,
        UserSubscription
      >(payload.id, state.friendRequests, state.subscriptions);

      return {
        ...state,
        friendRequests: reqToSubs.from,
        subscriptions: reqToSubs.to,
      };

    case SocialsActionTypes.ACCEPT_FRIEND_REQUEST_LOCAL:
      const reqToFriends = moveUserBetweenSocials<
        UserFriendRequest,
        UserSubscription
      >(payload.id, state.friendRequests, state.subscriptions);

      return {
        ...state,
        friendRequests: reqToFriends.from,
        friends: reqToFriends.to,
      };

    case SocialsActionTypes.REMOVE_FRIEND_LOCAL:
      const friendToSubs = moveUserBetweenSocials<
        UserFriendRequest,
        UserSubscription
      >(payload.id, state.friends, state.subscriptions);

      return {
        ...state,
        subscriptions: friendToSubs.to,
        friends: friendToSubs.from,
      };

    case SocialsActionTypes.ADD_FRIEND_LOCAL:
      const subToFriends = moveUserBetweenSocials<UserSubscription, UserFriend>(
        payload.id,
        state.subscriptions,
        state.friends
      );

      return {
        ...state,
        subscriptions: subToFriends.from,
        friends: subToFriends.to,
      };

    default:
      return state;
  }
};

export default socialsReducer;
