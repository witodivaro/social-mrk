import { createSelector } from 'reselect';

const selectUserPage = (state) => state.userPage;

export const selectUserPageUser = createSelector(
  selectUserPage,
  (userPage) => userPage.user
);

export const selectUserPageError = createSelector(
  selectUserPage,
  (userPage) => userPage.error
);

export const selectUserPageState = createSelector(
  selectUserPage,
  (userPage) => userPage.state
);