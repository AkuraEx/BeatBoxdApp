'use client';
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { authenticateSession, authenticateUser } from '../../utils/api';

export default function Login() {
    const handleSubmit = async ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const res = await authenticateUser(username, password);

            if (res) {
                console.log(res)
                // router.push('/')
            } else {
                console.log('ERRRRROR');
            }
            } catch (error) {
            console.log("anotha error lol", error);
                return;
            }
    };


    const checkToken = async () => {
        try {
            const res = await authenticateSession();

            if (res) {
                console.log(res)
                // router.push('/')
            } else {
                console.log('ERRRRROR');
            }
            } catch (error) {
            console.log("anotha error lol", error);
                return;
            }
    }



    return (
        <div className="container">
            <div className="content">
            <form className="content__form" onSubmit={handleSubmit}>
                <div className="content__inputs">
                <label>
                    <input type="username" name="username" placeholder="Enter Username" required />
                </label>
                <label>
                    <input type="password" name="password" placeholder="Enter Password" required/> 
                </label>
                </div>
                <button type="submit">Log In</button>
            </form>
            <div className="content__or-text">
                <span></span>
                <span>OR</span>
                <span></span>
            </div>
            <div className="content__forgot-buttons">
                <button>
                <span>
                </span>
                <span>Log in with Google</span>
                </button>
                <button>Forgot password?</button>
                <button onClick = {checkToken}>Check if auth??</button>
            </div>
            </div>
        </div>
    );
}