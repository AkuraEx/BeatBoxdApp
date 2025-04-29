'use client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchAlbum, fetchArtist, fetchReviews, saveAlbum } from "../../../utils/api.ts";
import ReviewForm from '../../../components/review.tsx';
import { useAuth } from "../../../context/AuthContext.tsx"
import { useState } from 'react';

export async function getServerSideProps(context: any) {
    const { slug } = context.params as { slug: string };

    console.log('Fetching album with slug:', slug);

    const albumRes = await fetchAlbum("slug", slug);
    const artistRes = await fetchArtist("AId",albumRes.AId);
    const reviewRes = await fetchReviews(albumRes.AlId);
    const reviewData = reviewRes.map((entry: any) => ({
    Username: entry.Username,
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
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {isAuthenticated, user, UId } = useAuth();

    const test = () => {
        console.log(albumData.AlId);
        try {
            const saveRes = saveAlbum(String(UId), albumData.AlId)
            console.log(saveRes);
            setSuccessMessage("Successfully Saved Album");
        } catch(error) {
            console.log(error);
            setSuccessMessage("An Error has Occured");
        }
    }


return (
    <div>
        <div className='albumContainer'>
            <div className='centered'>
        <a href={`/`}>Back to Front</a>

            <a href={`/artist/${artistData.slug}`} className='clickableText'>{artistData.Artist_Name}</a>
            <img className="album" src={albumData.IMG_URL} alt={albumData.Title} />
            <p>
            {albumData.Title}
            <br />
            Genre: {artistData.Body}
            </p>
            </div>

        {isAuthenticated && user && (
            <ReviewForm albumData={albumData} />
        )}

        {!user && ( 
            <h1>Log In To Leave A Review</h1>
        )}

      </div>
        {isAuthenticated && user && (
          <div>
            <button className='saveButton' onClick={test}>Save Album</button>
          </div>
        )}
        <p className="success"> {successMessage} </p>

      <ul id="index">
        {reviewData.map((entry: any) => (
          <div key={entry.RvId}>
            <div>
              <a href={`/profile/${entry.Username}`} className='clickableText'>User: {entry.Username}</a>
              <br />
              Review: {entry.RvId}
              <br />
              Body: {entry.Body}
              <br />
              Rating: {entry.Rate}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}