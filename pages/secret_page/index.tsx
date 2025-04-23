"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { spotfetchAlbums, spotfetchArtists } from "../../utils/spotify.ts";

export async function getServerSideProps(context: any) {
  
    spotfetchArtists(["artist", "teklintowe"]).catch(console.error);

return {
    props: { deez: "jazz"
    },
  };
};

export default function Home({deez}: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    if(!deez) {
        return <div>Deez not found</div>
    }
    return (
        <div>
            <h1>
                something
            </h1>
        </div>
    )
};

