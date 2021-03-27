export interface UserFriend {
  id: number;
  image: string;
  username: string;
}

export interface UserSubscription {
  id: number;
  image: string;
  username: string;
}

export interface UserFriendRequest {
  id: number;
  image: string;
  username: string;
}

export interface User {
  id: number;
  username: string;
  status: string;
  image: string;
  friends: UserFriend[];
  subscriptions: UserSubscription[];
}

export interface UserUpdate {
  username?: string;
  status?: string;
  iamge?: string;
  friends?: UserFriend[];
  subscriptions?: UserSubscription[];
}
