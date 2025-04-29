"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchArtistsAlbums, fetchArtist } from "../../../utils/api.ts";
import { spotfetchAlbums } from "../../../utils/spotify.ts";

export async function getServerSideProps(context: any) {
    const { slug } = context.params as { slug: string };

    console.log('Fetching album with slug:', slug);

    
    const artistRes = await fetchArtist("slug", slug);

    const albumRes = await fetchArtistsAlbums(artistRes.AId)

    const albums = albumRes.map((entry: any) => ({
    AlId: entry.AlId,
    AId: entry.AId,
    Title: entry.Title,
    Body: entry.Body,
    IMG_URL: entry.IMG_URL,
    slug: entry.slug,
    Date: entry.Added_On,
  }));

    if (!albumRes) {
    return {
      notFound: true,
    };
  }

  


return {
    props: { albums, 
        artistData: artistRes
    },
  };
};

export default function Home({ albums, artistData }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    if (!artistData) {
        return <div>Artist not found</div>;
    }
    return (
        <div>
            <a href={`/artist`}>
                Back to Front
            </a>
            <div>
                <img className = "album" src={artistData.IMG_URL} alt="img broke yo" />
                <p> {artistData.Artist_Name}<br/>
                    {artistData.Body}<br/>
                </p>
            </div>

            <h1> ALBUMS: <br/><br/></h1>
            <ul id = "index" className="albumContainer">   
                    {albums.map((entry: any) => (
                <div key={entry.AlId} className='album'>
            <a href={`/albums/${entry.slug}`}><img className = "cover" src={entry.IMG_URL} alt={entry.artist} /></a>
                    <div className="title">
                    Title: {entry.Title}
                    </div>
                </div>
                ))}
            </ul>
        </div>
    )
}
