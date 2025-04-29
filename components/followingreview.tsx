"use client";
import { useState, useEffect } from "react";
import { fetchFriendsReviews } from "../utils/api.ts";
import { useAuth } from "../context/AuthContext.tsx"



const FollowingReviews = () => {
  const [friendsReviews, setFriendsReviews] = useState<any[]>([]);
  const { UId } = useAuth();


  useEffect(() => {
    if (UId) {
      fetchFriendsReviews(String(UId)).then((res) => {
        console.log(res);
        if (res && Array.isArray(res)) {
          const reviews = res.map((entry: any) => ({
            RvId: entry.RvId,
            AlId: entry.AlId,
            slug: entry.slug,
            IMG_URL: entry.IMG_URL,
            Title: entry.Title,
            Username: entry.Username,
            Created_On: entry.Created_On,
            Body: entry.Body,
            Rate: entry.Rate
          }));
          setFriendsReviews(reviews);
        } else {
          console.warn("Expected array but got:", res);
        }
      });
    }
  }, [UId]);

  return (
    <div>
        <div className="underline-wrapper">
            <p className="underlineBoxd">Recent Reviews From People You Follow:</p>
        </div>
      <ul id="index" className="homepageContainer">
        {friendsReviews.map((entry: any) => (
          <div key={entry.RvId} className='homepage_album'>
            <a href={`/profile/${entry.Username}`}>{entry.Username}</a>
            <p>reviewed</p>
 
            <a href={`/albums/${entry.slug}`}>
              <img className="cover" src={entry.IMG_URL} alt={entry.Title} />
                {entry.Title}
                <p>Rating: {entry.Rate} </p>
                <p>Review: {entry.Body} </p>
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FollowingReviews;
