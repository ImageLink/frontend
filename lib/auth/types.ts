export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  phone: string;
  whatsapp?: string;
  telegram?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (data: SignUpData) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}