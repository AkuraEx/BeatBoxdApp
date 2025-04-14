'use client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { findUser } from "../../../utils/api.ts";
import { useAuth } from "../../../context/AuthContext"

export async function getServerSideProps(context: any) {
  try {
    const { slug } = context.params as { slug: string };
    console.log("Fetching user with slug:", slug);
    const profileRes = await findUser(slug);
    console.log(profileRes.User[0].Username);

    if (!profileRes) {
      return {
        notFound: true,
      };
    }

    return {
      props: { profileData: profileRes.User[0],
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

export default function ProfilePage({ profileData, profileUser }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { isAuthenticated, user } = useAuth();

  if (!profileData) {
    return <div>User not found</div>;
  }

  if ( isAuthenticated && profileUser === user ) {
    return <div>
        <h1> Hey bro, only you can see this right now nobody else</h1>
    </div>
  }
  
  return (
    <div>
      <a href="/">Back to Home</a>
      <h1>{profileData.Username}</h1>
    </div>
  );

}
