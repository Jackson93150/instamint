import axios from 'axios';

import { FollowInterface } from '@/interfaces';

export interface Follow {
  type: 'follower' | 'followed';
  accepted: boolean;
  minterId: number;
}

export const createFollow = async (data: Follow) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow`, data, {
    withCredentials: true,
  });
};

export const getFollowers = async (id: number) => {
  const followers = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/follow/follower/${id}`, {
    withCredentials: true,
  });
  return followers.data as FollowInterface[];
};

export const getFollowed = async (id: number) => {
  const followed = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/follow/followed/${id}`, {
    withCredentials: true,
  });
  return followed.data as FollowInterface[];
};
