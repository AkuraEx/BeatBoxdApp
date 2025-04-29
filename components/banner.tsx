'use client';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const Banner = () => {
  const router = useRouter();
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return (
    <div className="mybanner">
        <div className = "clickable">
          <img onClick={() => router.push('/')} width="300" height="250" src="/beatboxdReal(real).png" alt="BeatBoxd" />
        </div>
      <div className="button-group">
        <button onClick={() => router.push('/artist')} className="my-button">Artists</button>
        <button onClick={() => router.push('/albums')} className="my-button">Albums</button>
        <button onClick={() => router.push('/search')} className='my-button'>Search</button>

        {isAuthenticated ? (
          <>
            <button onClick={() => router.push(`/profile/${user}`)} className="my-button">{user}</button>
            <button onClick={handleSignOut} className="my-button">Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => router.push('/signup')} className="my-button">Sign Up</button>
            <button onClick={() => router.push('/login')} className="my-button">Log In</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
