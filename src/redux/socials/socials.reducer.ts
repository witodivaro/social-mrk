import { AnyAction } from 'redux';
import {
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
import { moveFriendToSubscriptions } from './socials.utils';

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
        getSubscriptionsState: GET_SUBSCRIPTIONS_STATES.SUCCESS,
        getSubscriptionsError: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        getSubscriptionsState: GET_SUBSCRIPTIONS_STATES.FAILURE,
        getSubscriptionsError: payload.errors,
      };

    case SocialsActionTypes.REMOVE_FRIEND_LOCAL:
      return {
        ...state,
        ...moveFriendToSubscriptions(
          payload.id,
          state.friends,
          state.subscriptions
        ),
      };

    case SocialsActionTypes.REJECT_FRIEND_REQUEST_LOCAL:
      return {
        ...state,
        friendRequests: state.friendRequests.filter(
          (user) => user.id !== payload.id
        ),
      };

    case SocialsActionTypes.REMOVE_FRIEND_LOCAL:
      return {
        ...state,
        friends: state.friends.filter((user) => user.id !== payload.id),
      };

    default:
      return state;
  }
};

export default socialsReducer;