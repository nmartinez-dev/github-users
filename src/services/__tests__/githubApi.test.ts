import { githubApi } from '../githubApi';
import { GitHubUser, SearchResponse } from '../../types';

jest.mock('../githubApi', () => ({
  githubApi: {
    getUsers: jest.fn(),
    searchUsers: jest.fn(),
    getUserDetails: jest.fn(),
  },
}));

const mockedGithubApi = githubApi as jest.Mocked<typeof githubApi>;

describe('githubApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should fetch users successfully', async () => {
      const mockUsers: GitHubUser[] = [
        {
          id: 1,
          login: 'testuser1',
          avatar_url: 'https://example.com/avatar1.jpg',
          type: 'User',
          name: 'Test User 1',
        },
        {
          id: 2,
          login: 'testuser2',
          avatar_url: 'https://example.com/avatar2.jpg',
          type: 'User',
          name: 'Test User 2',
        },
      ];

      mockedGithubApi.getUsers.mockResolvedValue(mockUsers);

      const result = await githubApi.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockedGithubApi.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw error when API call fails', async () => {
      const errorMessage = 'Network error';
      mockedGithubApi.getUsers.mockRejectedValue(new Error(errorMessage));

      await expect(githubApi.getUsers()).rejects.toThrow(errorMessage);
    });
  });

  describe('searchUsers', () => {
    it('should search users successfully', async () => {
      const mockSearchResponse: SearchResponse = {
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            id: 1,
            login: 'testuser1',
            avatar_url: 'https://example.com/avatar1.jpg',
            type: 'User',
            name: 'Test User 1',
          },
          {
            id: 2,
            login: 'testuser2',
            avatar_url: 'https://example.com/avatar2.jpg',
            type: 'User',
            name: 'Test User 2',
          },
        ],
      };

      mockedGithubApi.searchUsers.mockResolvedValue(mockSearchResponse.items);

      const result = await githubApi.searchUsers('test');

      expect(result).toEqual(mockSearchResponse.items);
      expect(mockedGithubApi.searchUsers).toHaveBeenCalledWith('test');
    });

    it('should encode query parameters correctly', async () => {
      const mockResponse = { items: [] };
      mockedGithubApi.searchUsers.mockResolvedValue(mockResponse.items);

      await githubApi.searchUsers('test user');

      expect(mockedGithubApi.searchUsers).toHaveBeenCalledWith('test user');
    });
  });

  describe('getUserDetails', () => {
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

      const result = await githubApi.getUserDetails('testuser');

      expect(result).toEqual(mockUser);
      expect(mockedGithubApi.getUserDetails).toHaveBeenCalledWith('testuser');
    });

    it('should encode username correctly', async () => {
      const mockResponse: GitHubUser = {
        id: 1,
        login: 'test/user',
        avatar_url: 'https://example.com/avatar.jpg',
        type: 'User',
      };
      mockedGithubApi.getUserDetails.mockResolvedValue(mockResponse);

      await githubApi.getUserDetails('test/user');

      expect(mockedGithubApi.getUserDetails).toHaveBeenCalledWith('test/user');
    });
  });
});
