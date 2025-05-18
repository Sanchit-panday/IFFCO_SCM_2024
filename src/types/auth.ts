export type UserRole = 'admin' | 'production' | 'distribution' | 'retailer' | 'logistics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}