import { USER_RELATIONS } from '../../../config/user-relations';

export interface UserFriend {
  id: number;
  image: string;
  username: string;
  relation: USER_RELATIONS;
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
  username: string;
  profile: {
    id: number;
    status: string;
    image: string | null;
  };
  friends: UserFriend[];
  subscriptions: UserSubscription[];
  relations?: keyof USER_RELATIONS;
}

export interface UserPreview {
  id: number;
  image: string;
  username: string;
}

export interface UserUpdate {
  username?: string;
  status?: string;
  image?: ArrayBuffer | string | null;
  friends?: UserFriend[];
  subscriptions?: UserSubscription[];
}
