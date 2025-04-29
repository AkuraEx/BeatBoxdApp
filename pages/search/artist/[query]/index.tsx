"use client";
import type { InferGetServerSidePropsType } from 'next';
import  React  from "react";
import { searchArtists } from "../../../../utils/api"

export async function getServerSideProps(context: any) {
    const { query } = context.params as { query: string };

    const searchRes = await searchArtists(query);
    console.log(searchRes);

    const data = searchRes.map((entry: any) => ({
    id: entry.AId,
    artist: entry.Artist_Name,
    slug: entry.slug,
    IMG_URL: entry.IMG_URL,
    date: entry.Added_On
  }));


return {
    props: { query, 
        data,
    },
  };
};

export default function Home({ query, data }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
    <div>
        <div className='frontpageHeader'>
          <p>Search Results For: </p>
          <div className='underline-wrapper'>
            <p className='center'>{query}</p>
          </div>
        </div>
        <div>
            <ul id="index" className="albumContainer">
            {data.map((entry: any) => (
            <div key={entry.id}  className='album'>
                <a href={`/artist/${entry.slug}`} max-width="300px">
                <img className="cover" src={`${entry.IMG_URL}`} alt={entry.artist} />
                </a>
                <a href={`/artist/${entry.slug}`}>
                {entry.artist}
                <br />
                </a>
            </div>
            ))}
        </ul>
      </div>
    </div>
    )
}
