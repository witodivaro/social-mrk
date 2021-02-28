import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  selectUser,
  (user) => user.currentUser
);

export const selectToken = createSelector(selectUser, (user) => user.token);

export const selectAuthErrors = createSelector(
  selectUser,
  (user) => user.authErrors
);

export const selectSignUpState = createSelector(
  selectUser,
  (user) => user.signUpState
);

export const selectSignInState = createSelector(
  selectUser,
  (user) => user.signInState
);
