import {
  GET_FRIENDS_STATES,
  GET_FRIEND_REQUESTS_STATES,
  GET_SUBSCRIPTIONS_STATES,
  SOCIAL_PAGE_STATES,
} from '../../config/socials-states';
import SocialsActionTypes from './socials.types';

const initialState = {
  friends: [],
  subscriptions: [],
  friendRequests: [],
  state: '',
  errors: null,
};

const socialsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SocialsActionTypes.GET_FRIENDS_START:
      return {
        ...state,
        state: GET_FRIENDS_STATES.FETCHING,
        errors: null,
      };

    case SocialsActionTypes.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: payload.friends,
        state: GET_FRIENDS_STATES.SUCCESS,
        errors: null,
      };

    case SocialsActionTypes.GET_FRIENDS_FAILURE:
      return {
        ...state,
        state: GET_FRIENDS_STATES.FAILURE,
        errors: payload.errors,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_START:
      return {
        ...state,
        state: GET_FRIEND_REQUESTS_STATES.FETCHING,
        errors: null,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        state: GET_FRIEND_REQUESTS_STATES.SUCCESS,
        errors: null,
        friendRequests: payload.friendRequests,
      };

    case SocialsActionTypes.GET_FRIEND_REQUESTS_FAILURE:
      return {
        ...state,
        state: GET_FRIEND_REQUESTS_STATES.FAILURE,
        errors: payload.errors,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_START:
      return {
        ...state,
        state: GET_SUBSCRIPTIONS_STATES.FETCHING,
        errors: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        state: GET_SUBSCRIPTIONS_STATES.SUCCESS,
        errors: null,
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        state: GET_SUBSCRIPTIONS_STATES.FAILURE,
        errors: payload.errors,
      };

    default:
      return state;
  }
};

export default socialsReducer;
