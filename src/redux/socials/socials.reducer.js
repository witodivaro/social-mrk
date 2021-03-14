import {
  GET_FRIENDS_STATES,
  GET_FRIEND_REQUESTS_STATES,
  GET_SUBSCRIPTIONS_STATES,
} from '../../config/socials-states';
import SocialsActionTypes from './socials.types';

const initialState = {
  friends: [],
  subscriptions: [],
  friendRequests: [],
  friendsState: '',
  friendsErrors: null,
  subscriptionsState: '',
  subscriptionsErrors: null,
  friendRequestsState: '',
  friendRequestsErrors: null,
};

const socialsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SocialsActionTypes.GET_FRIENDS_START:
      return {
        ...state,
        friendsState: GET_FRIENDS_STATES.FETCHING,
        friendsErrors: null,
      };

    case SocialsActionTypes.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
        friendsState: GET_FRIENDS_STATES.SUCCESS,
        friendsErrors: null,
      };

    case SocialsActionTypes.GET_FRIENDS_FAILURE:
      return {
        ...state,
        friendsState: GET_FRIENDS_STATES.FAILURE,
        friendsErrors: payload.errors,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_START:
      return {
        ...state,
        friendRequestsState: GET_FRIEND_REQUESTS_STATES.FETCHING,
        friendRequestsErrors: null,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        friendRequestsState: GET_FRIEND_REQUESTS_STATES.SUCCESS,
        friendRequestsErrors: null,
        friendRequests: payload.friendRequests,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_FAILURE:
      return {
        ...state,
        friendRequestsState: GET_FRIEND_REQUESTS_STATES.FAILURE,
        friendRequestsErrors: payload.errors,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_START:
      return {
        ...state,
        subscriptionsState: GET_SUBSCRIPTIONS_STATES.FETCHING,
        subscriptionsErrors: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptionsState: GET_SUBSCRIPTIONS_STATES.SUCCESS,
        subscriptionsErrors: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        subscriptionsState: GET_SUBSCRIPTIONS_STATES.FAILURE,
        subscriptionsErrors: payload.errors,
      };

    default:
      return state;
  }
};

export default socialsReducer;
