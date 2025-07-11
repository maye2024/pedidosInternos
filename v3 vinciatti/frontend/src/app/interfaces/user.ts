export interface User{
    name?: string;
    lastname?: string;
    email: string;
    password: string;
    credential?: string;
    role?: 'admin' | 'user';
}