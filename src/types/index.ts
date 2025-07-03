export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  location?: string;
  company?: string;
  blog?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export interface FavoritesContextType {
  favorites: string[];
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
  toggleFavorite: (username: string) => void;
}
