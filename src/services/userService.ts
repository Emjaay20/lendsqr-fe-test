import { User } from '@/types/user';

const STORAGE_KEY = 'lendsqr_users_data';

export const getUsers = async (): Promise<User[]> => {
    // checking if we're rendering client-side and retrieving cached items
    if (typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem(STORAGE_KEY);
        if (storedUsers) {
            return JSON.parse(storedUsers);
        }
    }

    // gracefully falling back to our API layer if cache is missed
    try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');

        const data: User[] = await response.json();

        // caching payload locally to reduce future network latency
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    const users = await getUsers();
    return users.find(user => user.id === id);
};
