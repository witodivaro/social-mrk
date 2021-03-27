import { USER_RELATIONS } from '../../../config/user-relations';

export interface UserFriend {
  id: number;
  image: string;
  username: string;
  isFriend?: boolean;
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
  image: string | null;
  friends: UserFriend[];
  subscriptions: UserSubscription[];
  relations?: keyof USER_RELATIONS;
}

export interface UserUpdate {
  username?: string;
  status?: string;
  image?: ArrayBuffer | string | null;
  friends?: UserFriend[];
  subscriptions?: UserSubscription[];
}
