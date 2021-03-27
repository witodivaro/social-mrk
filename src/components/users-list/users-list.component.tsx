import './users-list.styles.scss';

import { useMemo } from 'react';
import UserPreview from '../User/user-preview/user-preview.component';
import { User } from '../../types/redux/user/User';

interface UsersListProps {
  users: User[];
  friendRequests?: boolean;
  friends?: boolean;
  title: string;
  emptyMessage: string;
  errors: object;
}

const UsersList = ({
  users,
  friendRequests,
  title,
  emptyMessage,
  errors,
  friends,
}: UsersListProps) => {
  const renderedUsers = useMemo(() => {
    if (errors) {
      return <p className="users-list__error">{Object.values(errors)}</p>;
    }

    if (users.length > 0) {
      return users.map((user) => (
        <UserPreview
          key={user.id}
          user={user}
          isFriendRequest={friendRequests}
          isFriend={friends}
        />
      ));
    }

    return <p className="users-list__empty">{emptyMessage}</p>;
  }, [users, errors, friendRequests, emptyMessage]);

  const renderedTitle = useMemo(
    () =>
      users.length > 0 && !errors ? (
        <h2 className="users-list__title">{title}</h2>
      ) : null,
    [users, title]
  );

  return (
    <div className="users-list">
      {renderedTitle}
      {renderedUsers}
    </div>
  );
};

export default UsersList;
