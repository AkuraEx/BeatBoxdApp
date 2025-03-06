'use client';

const Banner = () => {
return(
    <div className='banner'>
                    <img width="350" height="100" src="/BeatBoxd.png" alt="BeatBoxd"/>
                <label>
                    <input type="radio" name="radio" />
                    <span>Sign In</span>
                </label>
                <label>
                    <input type="radio" name="radio" />
                    <span>Create An Account</span>
                </label>
                <label>
                <input
                    type="radio"
                    name="radio"
                    onClick={() => (window.location.href = "http://localhost:3000/albums/")}
                    />
                    <span>Albums</span>
                </label> 
                </div>
    );
};

export default Banner;