'use client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchAlbum, fetchArtist, fetchReviews, saveAlbum, createReview } from "../../../utils/api.ts";
import ReviewForm from '../../../components/review.tsx';
import { useAuth } from "../../../context/AuthContext.tsx"

export async function getServerSideProps(context: any) {
    const { slug } = context.params as { slug: string };

    console.log('Fetching album with slug:', slug);

    const albumRes = await fetchAlbum("slug", slug);
    const artistRes = await fetchArtist("AId",albumRes.AId);
    const reviewRes = await fetchReviews(albumRes.AlId);
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
    const {isAuthenticated, user } = useAuth();

    const test = () => {
        console.log(albumData.AlId);
        const saveRes = saveAlbum(2, albumData.AlId)
        console.log(saveRes);
    }


return (
    <div>
      <a href={`/`}>Back to Front</a>

      <div>
        <a href={`/artist/${artistData.slug}`} className='clickableText'>{artistData.Artist_Name}</a>
        <img className="album" src={albumData.IMG_URL} alt={albumData.Title} />
        <p>
          {albumData.Body}
          <br />
          {albumData.Added_On}
          <br />
          {albumData.Title}
        </p>

        <ReviewForm albumData={albumData} />
        {isAuthenticated && user && (
          <button onClick={test}>Save Album</button>
        )}
      </div>

      <ul id="index">
        {reviewData.map((entry: any) => (
          <div key={entry.RvId}>
            <div>
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