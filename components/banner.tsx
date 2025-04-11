'use client';
import { useRouter } from 'next/router'

const Banner = () => {
    const router = useRouter()

    
return(
    <div className="mybanner">
        <div className='banner'>
                    <label>
                        <img width="350" height="100" src="/BeatBoxd.png" alt="BeatBoxd" className="clickable"/>
                        <input
                            type="radio"
                            name="radio"
                            onClick={() => router.push("/")}
                            />
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="radio" 
                            onClick={() => router.push("/signup")}
                            />
                        <span>Sign Up</span>
                    </label>
                    <label>
                        <input
                            type="radio" 
                            name="radio" 
                            onClick={() => router.push("/login")}
                            />
                        <span>Log In</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="radio"
                            onClick={() => router.push("/albums")}
                            />
                        <span>Albums</span>
                    </label> 
                    <label>
                        <input
                            type="radio"
                            name="radio"
                            onClick={() => router.push("/artists")}
                            />
                        <span>Artist</span>
                    </label> 
                </div>
            </div>
    );
};

export default Banner;