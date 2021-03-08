import { createSelector } from 'reselect';

const selectUserPage = (state) => state.userPage;

export const selectUserPageUser = createSelector(
  selectUserPage,
  (userPage) => userPage.user
);

export const selectUserPageErrors = createSelector(
  selectUserPage,
  (userPage) => userPage.errors
);

export const selectUserPageState = createSelector(
  selectUserPage,
  (userPage) => userPage.state
);

export const selectUserPageId = createSelector(
  selectUserPageUser,
  (user) => user.id
);

export const selectAvatarModalShown = createSelector(
  selectUserPage,
  (userPage) => userPage.avatarModalShown
);
