import './users-list.styles.scss';

import React, { useMemo } from 'react';
import UserPreview from '../user-preview/user-preview.component';

const UsersList = ({ users, friendRequests, title, emptyMessage }) => {
  const renderedUsers = useMemo(
    () =>
      users.length > 0 ? (
        users.map((user) => (
          <UserPreview
            key={user.id}
            user={user}
            isFriendRequest={friendRequests}
          />
        ))
      ) : (
        <p className="users-list__empty">{emptyMessage}</p>
      ),
    [users]
  );

  const renderedTitle = useMemo(
    () =>
      users.length > 0 ? <h2 className="users-list__title">{title}</h2> : null,
    [users]
  );

  return (
    <div className="users-list">
      {renderedTitle}
      {renderedUsers}
    </div>
  );
};

export default UsersList;
