"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { spotfetchAlbums, spotfetchArtists, insertAlbumsForMultipleArtistsByName } from "../../utils/spotify.ts";

export async function getServerSideProps(context: any) {
  
    
     insertAlbumsForMultipleArtistsByName(["the beatles", "rolling stones", "led zeppelin", "pink floyd", "queen",
"jimi hendrix", "bob dylan", "elvis presley", "the who", "david bowie",
"bruce springsteen", "u2", "nirvana", "the doors", "ac/dc",
"the eagles", "fleetwood mac", "metallica", "aerosmith", "van halen",
"guns n' roses", "radiohead", "pearl jam", "the police", "red hot chili peppers",
"foo fighters", "black sabbath", "the clash", "ramones", "green day",
"the kinks", "cream", "the beach boys", "the rolling stones", "the yardbirds",
"deep purple", "the allman brothers band", "lynyrd skynyrd", "the byrds", "the animals",
"the zombies", "the velvet underground", "the stooges", "the smiths", "the cure",
"r.e.m.", "soundgarden", "alice in chains", "stone temple pilots", "smashing pumpkins"


]).catch(console.error);






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

