
export interface User {
    username: string;
    password?: string;
    role: userRole;
}
export type userRole = 'Admin' | 'Customer' | 'Driver';