"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import { fetchAlbums } from "../utils/api.ts";
import { useAuth } from "../context/AuthContext.tsx";
import  React  from "react";

  
export async function getServerSideProps() {

  


  return {
    props: {
    },
  };
}


export default function Home({   }:
  InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { isAuthenticated, user } = useAuth();

  if(isAuthenticated && user) {
    return (
      <div className='frontpageHeader'>
        <h1>
        Welcome back, <a href={`/profile/${user}`} className = "clickableText">{user}</a>.
        Here's what we've been listening to...
        </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>
        Welcome To Beatboxd
      </h1>
    </div>
  );
}