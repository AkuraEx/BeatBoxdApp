'use client';
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { authenticateUser } from '../../utils/api';

export default function Login() {
    const router = useRouter()

    const handleSubmit = async ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const res = await authenticateUser(username, password);
            if (2 === 2) {
                router.push('/')
            } else {
                console.log('ERRRRROR');
            }
            } catch (error) {
            console.log("anotha error lol", error);
                return;
            }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="username" name="username" placeholder="username" required />
                <input type="password" name="password" placeholder="Password" required/> 
                <button type="submit">Login</button>
            </form>
        </div>
    );
}