import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../services/githubApi';
import { GitHubUser } from '../types';

export const useUsers = () => {
  return useQuery<GitHubUser[], Error>({
    queryKey: ['users'],
    queryFn: githubApi.getUsers,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useSearchUsers = (query: string) => {
  return useQuery<GitHubUser[], Error>({
    queryKey: ['search', query],
    queryFn: () => githubApi.searchUsers(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};

export const useUserDetails = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ['user', username],
    queryFn: () => githubApi.getUserDetails(username),
    enabled: !!username,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
};
