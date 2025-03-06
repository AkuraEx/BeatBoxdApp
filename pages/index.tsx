"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import { fetchAlbums } from "../utils/api.ts";
import  React  from "react";
import Banner from '../components/banner';

  
export async function getServerSideProps() {
  const res = await fetchAlbums();
  const data: Array<string> = [] ;

  res.forEach((entry: any) => {
    data.push(JSON.stringify(entry));
  }) 

  


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
        <Banner />
      </div>
      <p>WORDS</p>
      <p>fdsa</p>
      <ul id = "index">   
        {data.map((entry) => (
          <p key={entry}>{entry}<br/></p>
        ))}
      </ul>

          <a href="http://localhost:3000/albums/">albums<br/></a>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Words</p>
      </main>
    </div>
  );
}