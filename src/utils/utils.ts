import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const url = {
    landing: '/',
    login: '/login',
    register: '/register',
    welcome: '/welcome',
    forgotPassword: '/auth/forgot-password',
    candidates: '/candidates',
};

export const cxTw = (...classes: ClassValue[]) => twMerge(clsx(...classes));
