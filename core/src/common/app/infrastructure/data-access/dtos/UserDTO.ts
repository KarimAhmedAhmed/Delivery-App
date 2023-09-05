
interface User {
    username: string;
    password?: string;
    role: 'Admin' | 'Customer' | 'Driver';
}