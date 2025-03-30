'use client';

import { useState } from 'react';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import { createUser } from '../../utils/api';

export default function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            console.log('✅ Success');
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
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                <button type="submit">Signup</button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}
