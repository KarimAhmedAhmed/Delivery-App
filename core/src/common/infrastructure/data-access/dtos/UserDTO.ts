
interface User {
    _id: string;
    username: string;
    password: string;
    role: 'Admin' | 'Customer' | 'Driver';
}