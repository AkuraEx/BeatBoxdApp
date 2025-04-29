"use client";
import type { InferGetServerSidePropsType } from 'next';
import  React  from "react";
import { searchAlbums } from "../../../../utils/api"

export async function getServerSideProps(context: any) {
    const { query } = context.params as { query: string };

    const searchRes = await searchAlbums(query);
    console.log(searchRes);

    const data = searchRes.map((entry: any) => ({
    id: entry.AlId,
    title: entry.Title,
    slug: entry.slug,
    IMG_URL: entry.IMG_URL
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
        <div className='frontpageHeader'>
          <p>Search Results For: </p>
          <div className='underline-wrapper'>
            <p className='center'>{query}</p>
          </div>
        <div>
        </div>
            <ul id = "index" className="albumContainer">   
            {data.map((entry: any) => (
        <div key={entry.id} className="album">
            <a href={`/albums/${entry.slug}`}><img src={entry.IMG_URL} alt={entry.title} className='cover'/></a>
            <a href={`/albums/${entry.slug}`} className = "title">{entry.title}<br/></a>
        </div>
        ))}
      </ul>
      </div>
    )
}
