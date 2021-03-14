import React from 'react';
import { NavLink } from 'react-router-dom';

const isActive = (path, _, match) => {
  if (!match) {
    return false;
  }

  if (path.startsWith('/')) {
    return match.pathname === path;
  }

  return (
    match.pathname.split('/').slice(0, -1).join('/') + '/' + path ===
    match.pathname
  );
};

const CustomLink = ({ to, className, activeClassName, children }) => {
  return (
    <NavLink
      to={to}
      className={className}
      activeClassName={activeClassName}
      isActive={isActive.bind(this, to.pathname || to)}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
