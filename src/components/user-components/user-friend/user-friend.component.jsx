import "./user-friend.styles.scss";
import React, { useMemo, useRef } from "react";
import CustomButton from "../../custom-button/custom-button.component";
import { ReactComponent as NoAvatar } from "../../../assets/images/no-avatar.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../redux/user/user.selectors";
import { manageFriendsStart } from "../../../redux/socials/socials.actions";

const UserFriend = ({ user }) => {
  const { id, image, username, isFriend } = user;
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);

  const addToFriendsHandler = (e) => {
    e.preventDefault();
    dispatch(manageFriendsStart({ id, addFriend: true }));
  };

  const removeFromFriendsHandler = (e) => {
    e.preventDefault();
    dispatch(manageFriendsStart({ id, removeFriend: true }));
  };

  const renderedUserAvatar = useMemo(
    () =>
      image ? (
        <p
          className="friends__avatar"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ) : (
        <NoAvatar className="friends__avatar" />
      ),
    [user]
  );

  const renderedAction = useMemo(() => {
    if (currentUserId === id) {
      return null;
    }

    if (isFriend) {
      return <CustomButton onClick={removeFromFriendsHandler}>-</CustomButton>;
    }

    return (
      <CustomButton inverted onClick={addToFriendsHandler}>
        +
      </CustomButton>
    );
  }, [
    isFriend,
    currentUserId,
    id,
    removeFromFriendsHandler,
    addToFriendsHandler,
  ]);

  return (
    <li className="friends__item">
      <Link to={`id${id}`} className="friends__link">
        {renderedUserAvatar}
        <span className="friends__name">{username}</span>
        <div className="friends__actions">{renderedAction}</div>
      </Link>
    </li>
  );
};

export default UserFriend;
