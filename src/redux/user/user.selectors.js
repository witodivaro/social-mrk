import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  selectUser,
  (user) => user.currentUser
);

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser?.id
);

export const selectToken = createSelector(selectUser, (user) => user.token);

export const selectSignInErrors = createSelector(
  selectUser,
  (user) => user.signInErrors
);

export const selectSignUpErrors = createSelector(
  selectUser,
  (user) => user.signUpErrors
);

export const selectSignUpState = createSelector(
  selectUser,
  (user) => user.signUpState
);

export const selectSignInState = createSelector(
  selectUser,
  (user) => user.signInState
);
