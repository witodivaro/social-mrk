import './user-avatar.styles.scss';

import React from 'react';
import { ReactComponent as NoAvatar } from '../../assets/images/no-avatar.svg';

const UserAvatar = () => {
  return (
    <p className="avatar">
      <NoAvatar className="avatar__svg" />
    </p>
  );
};

export default UserAvatar;
