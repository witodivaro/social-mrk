import { UserFriend, UserSubscription } from '../../types/redux/user/User';

export const moveFriendToSubscriptions = (
  friendId: number,
  friends: UserFriend[],
  subscriptions: UserSubscription[]
): {
  friends: UserFriend[];
  subscriptions: UserSubscription[];
} => {
  const existingFriend = friends.find((friend) => friend.id === friendId);

  if (!existingFriend) {
    return {
      friends,
      subscriptions,
    };
  }

  const filteredFriends = friends.filter((friend) => friend !== existingFriend);
  const replenishedSubscriptions = [
    existingFriend as UserSubscription,
    ...subscriptions,
  ];

  return {
    friends: filteredFriends,
    subscriptions: replenishedSubscriptions,
  };
};
