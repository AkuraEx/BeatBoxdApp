"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import { authenticateSession, fetchAlbums } from "../utils/api.ts";
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

const checkToken = async () => {
  try {
      const res = await authenticateSession();

      if (res) {
          console.log(res)
          // router.push('/')
      } else {
          console.log('ERRRRROR');
      }
      } catch (error) {
      console.log("anotha error lol", error);
          return;
      }
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

      <button onClick={checkToken}>Am I authenticated?</button>

    </div>
  );
}