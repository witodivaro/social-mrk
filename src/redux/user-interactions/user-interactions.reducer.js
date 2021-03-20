import UserInteractionsActionTypes from "./user-interactions.types";

const initialState = {};

const userInteractionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserInteractionsActionTypes.MANAGE_FRIENDS_START:

    default:
      return state;
  }
};

export default userInteractionsReducer;
