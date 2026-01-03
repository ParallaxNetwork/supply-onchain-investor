import type { User } from "@/types/user";
import { MOCK_USERS } from "@/data/mock-users";

/**
 * Data layer for user management
 * This can be easily replaced with real API calls in the future
 */

export async function getUsers(): Promise<User[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/users');
  // return response.json();
  
  // For now, return mock data
  return Promise.resolve(MOCK_USERS);
}

export async function searchUsers(query: string): Promise<User[]> {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/users/search?q=${query}`);
  // return response.json();
  
  // For now, filter mock data
  const lowerQuery = query.toLowerCase();
  return Promise.resolve(
    MOCK_USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery),
    ),
  );
}

