"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import { fetchAlbums } from "../../utils/api.ts";
import  React  from "react";



  
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



export default function Home({ data,  }:
  InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div>
      <ul id = "index" className="albumContainer">   
        {data.map((entry: any) => (
      <div key={entry.id}>
          <a href={`/albums/${entry.slug}`}><img className = "cover" src={entry.IMG_URL} alt={entry.title} /></a>
          <a href={`/albums/${entry.slug}`}>{entry.title}<br/></a>
      </div>
      ))}
      </ul>
    </div>
  );
}