'use client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { findUser, findUserSaved } from "../../../utils/api.ts";
import { useAuth } from "../../../context/AuthContext"

export async function getServerSideProps(context: any) {
  try {
    const { slug } = context.params as { slug: string };
    console.log("Fetching user with slug:", slug);
    const profileRes = await findUser(slug);
    console.log(profileRes.User[0].Username);

    console.log(profileRes.User[0].UId);
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

    if (!profileRes) {
      return {
        notFound: true,
      };
    }

    return {
      props: { albums,
            profileData: profileRes.User[0],
            profileUser: slug
       },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { profileData: null },
    };
  }
}

export default function ProfilePage({ profileData, profileUser, albums }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { isAuthenticated, user } = useAuth();

  if (!profileData) {
    return <div>User not found</div>;
  }

  
  return (
    <div>
      <a href="/">Back to Home</a>
      <h1>{profileData.Username}</h1>

       <h1> Saved Albums: <br/><br/></h1>
          <ul id = "index" className="profileContainer">   
                  {albums.map((entry: any) => (
              <div key={entry.AlId} className='profile_album'>
          <a href={`/albums/${entry.slug}`}><img className = "cover" src={entry.IMG_URL} alt={entry.artist} /></a>

              </div>
              ))}
          </ul>

    {isAuthenticated && profileUser === user && (
    <div>
        <h1> Hey bro, only you can see this right now nobody else</h1>
    </div>
    )}


    </div>
  );

}
