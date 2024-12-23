export interface UsersResult {
  message: string;
  success: Boolean;
  data: User[];
  meta: UsersMetadata;
}

export interface UserResult {
  message: string;
  success: Boolean;
  data: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface UsersMetadata {
  page: number;
  limit: number;
  total_pages: number;
  total_users: number;
}