'use client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { findUser, findUserSaved, findFollowing, followUser } from "../../../utils/api.ts";
import { useAuth } from "../../../context/AuthContext"

export async function getServerSideProps(context: any) {
  try {
    const { slug } = context.params as { slug: string };
    const profileRes = await findUser(slug);
    if(profileRes) {

      const albumRes = await findUserSaved(profileRes.User[0].UId);

      console.log(albumRes)

      const albums = albumRes.map((entry: any) => ({
      AlId: entry.AlId,
      AId: entry.AId,
      Title: entry.Title,
      Body: entry.Body,
      IMG_URL: entry.IMG_URL,
      slug: entry.slug,
      Date: entry.Added_On,
      }));

      const followRes = await findFollowing(profileRes.User[0].UId);

      const following = followRes.map((entry: any) => ({
        UId: entry.UId,
        Username: entry.Username
      }));

        return {
        props: { albums,
              following,
              profileData: profileRes.User[0],
              profileUser: slug
        },
      };
    }

    if (!profileRes) {
      return {
        notFound: true,
        albums: null
      };
    }


  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { profileData: null },
    };
  }
}

export default function ProfilePage({ profileData, profileUser, albums, following }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { isAuthenticated, user, UId } = useAuth();

  if (!profileData) {
    return <div>User not found</div>;
  }

  const follow = () => {
    const followRes = followUser(String(UId), profileData.UId);
    console.log(followRes);
  }

  
  return (
    <div>
      <a className="clickableText" href="/">Back to Home</a>
      <div className='underline-wrapper'>
        <h1 className='underlineBoxd'>{profileData.Username}'s Profile</h1>
      </div>

       <h1> Saved Albums: <br/><br/></h1>
          <ul id = "index" className="profileContainer">   
                  {albums.map((entry: any) => (
              <div key={entry.AlId} className='profile_album'>
          <a href={`/albums/${entry.slug}`}><img className = "cover" src={entry.IMG_URL} alt={entry.artist} /></a>

              </div>
              ))}
          </ul>


    {(!user || profileUser != user) && ( 
    <div>
      <h1> This User is Following: <br/><br/></h1>
          <ul id = "index" className="profileContainer">   
                  {following.map((entry: any) => (
              <div key={entry.UId} className='profile_album'>
          <a className="friend-box" href={`/profile/${entry.Username}`}>{entry.Username}</a>

              </div>
              ))}
          </ul>
      </div>
    )}



    {isAuthenticated && profileUser === user && (
    <div>

        <h1> People Who You Follow: <br/><br/></h1>
          <ul id = "index" className="profileContainer">   
                  {following.map((entry: any) => (
              <div key={entry.UId} className='profile_album'>
          <a className="friend-box" href={`/profile/${entry.Username}`}>{entry.Username}</a>

              </div>
              ))}
          </ul>
    </div>
    )}

    {isAuthenticated && profileUser != user && (
      <div>
        <button onClick={follow} className='my-button'>Follow</button>
      </div>
    )}


    </div>
  );

}
