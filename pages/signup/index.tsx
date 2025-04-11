'use client';
import { useState } from 'react';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import { createUser } from '../../utils/api';

export default function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setErrorMessage("Invalid email format.");
            return;
        }

        if (!validatePassword(formData.password)) {
            setErrorMessage("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
            return;
        }


        try {
        const res = await createUser(formData.username, formData.email, formData.password);
            console.log(res);
        if (res) {
            setSuccessMessage(`Welcome To BeatBoxd, ${formData.username}!`)
        } else {
            console.log('❌ Error: Submission failed');
        }
        } catch (error) {
        console.log('❌ Error submitting form', error);
            return;
        }


        setErrorMessage(null);
    };

    return (
        <div className="container">
            <div className="content">
            <form className="content__form" onSubmit={handleSubmit}>
                <div className="content__inputs">
                <label>
                    <input type="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" required />
                </label>
                <label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required/>
                </label>
                <label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required/> 
                </label>
                </div>
                <button type="submit">Sign Up</button>
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
                <span>Sign Up with Google</span>
                </button>
                <p className="error"> {errorMessage}</p>
                <p className="success"> {successMessage}</p>
            </div>
            </div>
        </div>
    );
}
