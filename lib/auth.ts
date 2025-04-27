import { User } from './types';

// Mock authentication for demonstration
// In a real app, use a proper auth solution like NextAuth.js or Auth0

const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@restaurant.com',
    role: 'admin'
  }
];

let currentUser: User | null = null;

export const login = (email: string, password: string) => {
  // In a real app, this would verify credentials securely
  // For demo purposes, we just check the email and use any password
  if (password && password.length > 0) {
    const user = users.find(u => u.email === email);
    if (user) {
      currentUser = user;
      return { success: true, user };
    }
  }
  return { success: false, error: 'Invalid credentials' };
};

export const logout = () => {
  currentUser = null;
  return { success: true };
};

export const getCurrentUser = () => {
  return currentUser;
};

export const isAdmin = () => {
  return currentUser?.role === 'admin';
};

export const requireAdmin = () => {
  if (!currentUser || currentUser.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return true;
};