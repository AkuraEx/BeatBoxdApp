"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import { fetchAlbums } from "../utils/api.ts";
import  React  from "react";

  
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
      <ul id = "index">   
        {data.map((entry) => (
          <p key={entry}>{entry}<br/></p>
        ))}
      </ul>

    </div>
  );
}