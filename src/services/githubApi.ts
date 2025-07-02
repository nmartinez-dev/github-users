import axios from 'axios';
import { GitHubUser, SearchResponse } from '../types';

const BASE_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 404) {
      throw new Error('User not found.');
    }
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
);

export const githubApi = {
  getUsers: async (): Promise<GitHubUser[]> => {
    try {
      const response = await api.get<GitHubUser[]>('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchUsers: async (query: string): Promise<GitHubUser[]> => {
    try {
      const response = await api.get<SearchResponse>(`/search/users?q=${encodeURIComponent(query)}`);
      return response.data.items;
    } catch (error) {
      throw error;
    }
  },

  getUserDetails: async (username: string): Promise<GitHubUser> => {
    try {
      const response = await api.get<GitHubUser>(`/users/${encodeURIComponent(username)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
