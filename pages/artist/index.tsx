"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { fetchArtists } from "../../utils/api.ts";
import  React  from "react";



  
export async function getServerSideProps() {
  const res = await fetchArtists();
  

  const data = res.map((entry: any) => ({
    id: entry.AId,
    artist: entry.Artist_Name,
    slug: entry.slug,
    date: entry.Added_On
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
      <ul id = "index">   
        {data.map((entry: any) => (
      <div key={entry.id}>
          <a href={`/artist/${entry.slug}`}><img className = "cover" src={`${entry.slug}.jpg`} alt={entry.artist} /></a>
          <a href={`/artist/${entry.slug}`}>{entry.artist}<br/></a>
      </div>
      ))}
      </ul>
    </div>
  );
}