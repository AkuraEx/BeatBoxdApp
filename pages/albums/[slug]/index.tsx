"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchAlbum } from "../../../utils/api.ts";
import Image from 'next/image';



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as { slug: string };

    console.log('Fetching album with slug:', slug);

    const res = await fetchAlbum(slug);
    

    if (!res) {
    return {
      notFound: true,
    };
  }

return {
    props: { data: res },
  };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    if (!data) {
        return <div>Album not found</div>;
    }
    return (
        <div>
            <div className="mydict">
                <div className='banner'>
                    <Image width="350" height="100" src="/BeatBoxd.png" alt="BeatBoxd"/>
                <label>
                    <input type="radio" name="radio" />
                    <span>Sign In</span>
                </label>
                <label>
                    <input type="radio" name="radio" />
                    <span>Create An Account</span>
                </label>
                <label>
                <input
                    type="radio"
                    name="radio"
                    onClick={() => (window.location.href = "http://localhost:3000/albums/")}
                    />
                    <span>Albums</span>
                </label> 
                </div>
                    <a href={`http://localhost:3000`}>
                     Back to Front
                    </a>
                    <div>
                        <img className = "cover" src={`../${data.slug}.jpg`} alt={data.Title} />
                        <p> {data.Body}<br/>
                         {data.Added_On} <br/>
                         {data.Title} </p>
                    </div>
            </div>
        </div>
    )
}
