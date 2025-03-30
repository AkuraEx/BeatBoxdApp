"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchAlbum, fetchArtist, fetchReviews, createReview } from "../../../utils/api.ts";
import Image from 'next/image';
import ReviewForm from '../../../components/review.tsx';

export async function getServerSideProps(context: any) {
    const { slug } = context.params as { slug: string };

    console.log('Fetching album with slug:', slug);

    const albumRes = await fetchAlbum(slug);
    const artistRes = await fetchArtist(Number(albumRes.AId));
    const reviewRes = await fetchReviews(Number(albumRes.AlId));
    const reviewData = reviewRes.map((entry: any) => ({
    RvId: entry.RvId,
    Body: entry.Body,
    Rate: entry.Rate,
  }));
    
    console.log(reviewRes);

    if (!albumRes) {
    return {
      notFound: true,
    };
  }

return {
    props: { albumData: albumRes, 
        artistData: artistRes,
        reviewData
    },
  };
};

export default function Home({ albumData, artistData, reviewData }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    if (!albumData) {
        return <div>Album not found</div>;
    }
    return (
        <div>
            <a href={`http://localhost:3000`}>
                Back to Front
            </a>
            <div>
                <img className = "cover" src={`../${albumData.slug}.jpg`} alt={albumData.Title} />
                <p> {artistData.Artist_Name}<br/>
                    {albumData.Body}<br/>
                    {albumData.Added_On} <br/>
                    {albumData.Title} </p>
                    <ReviewForm albumData={albumData}/>
            </div>

            <ul id = "index">   
                    {reviewData.map((entry: any) => (
                <div key={entry.RvId}>
                    <div>
                    Review: {entry.RvId}<br/>
                    Body: {entry.Body}<br/>
                    Rating: {entry.Rate}</div>
                </div>
                ))}
            </ul>
        </div>
    )
}
