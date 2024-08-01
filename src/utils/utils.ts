import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const url = {
    landing: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    forgotPassword: '/auth/forgot-password',
};

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));
