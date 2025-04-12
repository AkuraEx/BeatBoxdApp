"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchArtistsAlbums, fetchArtist } from "../../../utils/api.ts";
import Image from 'next/image';
import ReviewForm from '../../../components/review.tsx';

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
            <a href={`http://localhost:3000`}>
                Back to Front
            </a>
            <div>
                <p> {artistData.Artist_Name}<br/>
                    {artistData.Body}<br/>
                    {artistData.Added_On} <br/><br/>
                </p>
            </div>

            <h1> ALBUMS: <br/><br/></h1>
            <ul id = "index">   
                    {albums.map((entry: any) => (
                <div key={entry.AlId}>
                    <div>
                    Title: {entry.Title}<br/>
                    Body: {entry.Body}<br/>
                    Date: {entry.Date}</div>
                </div>
                ))}
            </ul>
        </div>
    )
}
