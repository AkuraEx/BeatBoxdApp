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
    IMG_URL: entry.IMG_URL,
    date: entry.Added_On
  }));
 

  


  return {
    props: {
      data,
    },
  };
}



export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div className='frontpageHeader'>
            <div className='underline-wrapper'>
              <p className='center'>Artists</p>
            </div>
      </div>
      <ul id="index" className="albumContainer">
        {data.map((entry: any) => (
          <div key={entry.id}  className='album'>
            <a href={`/artist/${entry.slug}`} max-width="300px">
              <img className="cover" src={`${entry.IMG_URL}`} alt={entry.artist} />
            </a>
            <a href={`/artist/${entry.slug}`}>
              {entry.artist}
              <br />
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}
