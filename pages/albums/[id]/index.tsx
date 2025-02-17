"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import  React  from "react";
import { fetchNote } from "../../../utils/api.ts";



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const res = await fetchNote(Number(id));
    const data = JSON.stringify(res);


return {
    props: {
        data,
    },
  };
}

export default function Home({ data,
 }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <div>
            <div className="mydict">
                <div>
                    <a href={`http://localhost:3000`}>
                    {data}
                    </a>
                </div>
            </div>
        </div>
    )
}
