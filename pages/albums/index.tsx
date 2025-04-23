"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import { fetchAlbums } from "../../utils/api.ts";
import  React  from "react";
import { useAuth } from "../../context/AuthContext"


  
export async function getServerSideProps() {
  const res = await fetchAlbums();
  

  const data = res.map((entry: any) => ({
    id: entry.AlId,
    title: entry.Title,
    slug: entry.slug,
    IMG_URL: entry.IMG_URL
  }));
 

  


  return {
    props: {
      data,
    },
  };
}



export default function Home({ data  }:
  InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div>
      <ul id = "index" className="albumContainer">   
        {data.map((entry: any) => (
      <div key={entry.id} className="album">
          <a href={`/albums/${entry.slug}`}><img src={entry.IMG_URL} alt={entry.title} className='cover'/></a>
          <a href={`/albums/${entry.slug}`} className = "title">{entry.title}<br/></a>
      </div>
      ))}
      </ul>
    </div>
  );
}