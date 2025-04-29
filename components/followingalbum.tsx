"use client";
import { useState, useEffect } from "react";
import { fetchFriendsAlbums } from "../utils/api.ts";
import { useAuth } from "../context/AuthContext.tsx"



const FollowingAlbums = () => {
  const [friendsAlbums, setFriendsAlbums] = useState<any[]>([]);
  const { UId } = useAuth();


  useEffect(() => {
    if (UId) {
      fetchFriendsAlbums(String(UId)).then((res) => {
        console.log(res);
        if (res && Array.isArray(res)) {
          const albums = res.map((entry: any) => ({
            AlId: entry.AlId,
            slug: entry.slug,
            IMG_URL: entry.IMG_URL,
            Title: entry.Title,
            Saved_By: entry.Saved_By,
            Created_On: entry.Created_On
          }));
          setFriendsAlbums(albums);
        } else {
          console.warn("Expected array but got:", res);
        }
      });
    }
  }, [UId]);

  return (
    <div>
        <div className="underline-wrapper">
            <p className="underlineBoxd">Recently Saved Albums From People You Follow:</p>
        </div>
      <ul id="index" className="homepageContainer">
        {friendsAlbums.map((entry: any) => (
          <div key={entry.AlId} className='homepage_album'>
            <a href={`/profile/${entry.Saved_By}`}>{entry.Saved_By}</a>
            <p>saved</p>
            <a href={`/albums/${entry.slug}`}>
              <img className="cover" src={entry.IMG_URL} alt={entry.Title} />
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FollowingAlbums;
