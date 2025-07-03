import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers, useSearchUsers, useUserDetails } from '../useGitHubUsers';
import { githubApi } from '../../services/githubApi';
import { GitHubUser, SearchResponse } from '../../types';

jest.mock('../../services/githubApi');
const mockedGithubApi = githubApi as jest.Mocked<typeof githubApi>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: any }) => {
    return QueryClientProvider({ client: queryClient, children });
  };
};

describe('useGitHubUsers hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers: GitHubUser[] = [
        {
          id: 1,
          login: 'user1',
          avatar_url: 'https://example.com/avatar1.jpg',
          type: 'User',
          name: 'User One',
        },
        {
          id: 2,
          login: 'user2',
          avatar_url: 'https://example.com/avatar2.jpg',
          type: 'User',
          name: 'User Two',
        },
      ];

      mockedGithubApi.getUsers.mockResolvedValue(mockUsers);

      const { result } = renderHook(() => useUsers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUsers);
      expect(mockedGithubApi.getUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('useSearchUsers', () => {
    it('should search users successfully', async () => {
      const mockSearchResponse: SearchResponse = {
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            id: 1,
            login: 'searchuser1',
            avatar_url: 'https://example.com/avatar1.jpg',
            type: 'User',
            name: 'Search User One',
          },
          {
            id: 2,
            login: 'searchuser2',
            avatar_url: 'https://example.com/avatar2.jpg',
            type: 'User',
            name: 'Search User Two',
          },
        ],
      };

      mockedGithubApi.searchUsers.mockResolvedValue(mockSearchResponse.items);

      const { result } = renderHook(() => useSearchUsers('search'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSearchResponse.items);
      expect(mockedGithubApi.searchUsers).toHaveBeenCalledWith('search');
    });
  });

  describe('useUserDetails', () => {
    it('should fetch user details successfully', async () => {
      const mockUser: GitHubUser = {
        id: 1,
        login: 'testuser',
        avatar_url: 'https://example.com/avatar.jpg',
        type: 'User',
        name: 'Test User',
        bio: 'Test bio',
        public_repos: 10,
        followers: 100,
        following: 50,
        location: 'Test City',
        company: 'Test Company',
        blog: 'https://test.com',
        created_at: '2020-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      };

      mockedGithubApi.getUserDetails.mockResolvedValue(mockUser);

      const { result } = renderHook(() => useUserDetails('testuser'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockUser);
      expect(mockedGithubApi.getUserDetails).toHaveBeenCalledWith('testuser');
    });
  });
});
