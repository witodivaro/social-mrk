import {
  GET_FRIENDS_STATES,
  GET_FRIEND_REQUESTS_STATES,
  GET_SUBSCRIPTIONS_STATES,
} from "../../config/socials-states";
import SocialsActionTypes from "./socials.types";

const initialState = {
  friends: [],
  subscriptions: [],
  friendRequests: [],
  friendsState: "",
  friendsErrors: null,
  subscriptionsState: "",
  subscriptionsErrors: null,
  friendRequestsState: "",
  friendRequestsErrors: null,
  upToDateSocials: {
    friends: false,
    subscriptions: false,
    friendRequests: false,
  },
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
        upToDateSocials: {
          ...state.upToDateSocials,
          friends: true,
        },
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
        upToDateSocials: {
          ...state.upToDateSocials,
          friendRequests: true,
        },
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
        upToDateSocials: {
          ...state.upToDateSocials,
          subscriptions: true,
        },
      };

    case SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        subscriptionsState: GET_SUBSCRIPTIONS_STATES.FAILURE,
        subscriptionsErrors: payload.errors,
      };

    case SocialsActionTypes.REMOVE_FRIEND_REQUEST:
      return {
        ...state,
        friendRequests: state.friendRequests.filter(
          (user) => user.id !== payload.id
        ),
      };

    case SocialsActionTypes.REMOVE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((user) => user.id !== payload.id),
      };

    case SocialsActionTypes.MANAGE_FRIENDS_SUCCESS:
      return {
        ...state,
        upToDateSocials: {
          friends: false,
          friendRequests: false,
          subscriptions: false,
        },
      };

    default:
      return state;
  }
};

export default socialsReducer;
