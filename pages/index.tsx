"use client";
import { useAuth } from "../context/AuthContext.tsx";
import FollowingAlbums from "../components/followingalbum.tsx";
import FollowingReviews from "../components/followingreview.tsx";

export default function Home() {
  const { isAuthenticated, user, UId } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="frontpageHeader">
        <h1>Welcome To Beatboxd!</h1>
        <p>Please log in to see what we've been listening to...</p>
        <a href="/login" className="clickableText">Log in</a>
      </div>
    );
  }

  return (
    <div>
      <div className='frontpageHeader'>
        <h1>
          Welcome back, <a href={`/profile/${user}`} className="clickableText">{user}</a>.
          Here's what we've been listening to...
        </h1>
      </div>

      {isAuthenticated && user && <FollowingAlbums />} 
      {isAuthenticated && user && <FollowingReviews />} 
    </div>
  );
}