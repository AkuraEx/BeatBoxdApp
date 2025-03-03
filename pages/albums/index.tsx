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
      <div className="mydict">
        <div className = "banner">
          <img className = "yuhh" src="BeatBoxd.png" alt="BeatBoxd"></img>
          <label>
            <input type="radio" name="radio" />
            <span>Sign In</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Create An Account</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              onClick={() => (window.location.href = "http://localhost:3000/albums/")}
            />
            <span>Albums</span>
          </label>
        </div>
      </div>
      <ul id = "index" className="albumContainer">   
        {data.map((entry: any) => (
      <div key={entry.id}>
          <a href={`http://localhost:3000/albums/${entry.slug}`}><img className = "cover" src={`${entry.slug}.jpg`} alt={entry.title} /></a>
          <a href={`http://localhost:3000/albums/${entry.slug}`}>{entry.title}<br/></a>
      </div>
      ))}

      </ul>



      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

      </main>
    </div>
  );
}