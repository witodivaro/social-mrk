import './users-list.styles.scss';

import React, { useMemo } from 'react';
import UserPreview from '../user-preview/user-preview.component';

const UsersList = ({ users, friendRequests }) => {
  const renderedUsers = useMemo(
    () =>
      users.map((user) => (
        <UserPreview
          key={user.id}
          user={user}
          isFriendRequest={friendRequests}
        />
      )),
    [users]
  );

  return <div className="users-list">{renderedUsers}</div>;
};

export default UsersList;
