'use client';
import { useRouter } from 'next/router'

const Banner = () => {
    const router = useRouter()

    
return(
        <div className="mybanner">
            <div className="button-group">
                <img onClick={() => router.push('/')} width="350" height="100" src="/BeatBoxd.png" alt="BeatBoxd" className="clickable"/>
                <button onClick={() => router.push('/artist')} className="my-button">Artists</button>
                <button onClick={() => router.push('/albums')} className="my-button">Albums</button>
                <button onClick={() => router.push('/signup')} className="my-button">Sign Up</button>
                <button onClick={() => router.push('/login')} className="my-button">Log In</button>
            </div>
        </div>
    );
};

export default Banner;