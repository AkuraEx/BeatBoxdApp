'use client';
import { useAuth } from '../../context/AuthContext';

export default function userPage(context: any) {
    const { userSlug } = context.params as { userSlug: string }; 
    const {isAuthenticated, user, setIsAuthenticated, setUser } = useAuth();

    return (
        <div>
            <h1>Yooooooo {userSlug}</h1>
        </div>
    )
}