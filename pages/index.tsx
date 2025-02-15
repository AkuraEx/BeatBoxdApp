"use client";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Image from "next/image";
import  React  from "react";
import { fetchMessage } from "../utils/api.ts";

type Info = {
  id: number;
  title: string;
  contents: string;
  created: string;
};


export async function getServerSideProps() {
  const res = await fetchMessage();
  const data = await res;

  return {
    props: {
      data,
    },
  };
}


export default function Home({ data,  }:
  InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <div>
      <div className="mydict">
        <div>
          <label>
            <input type="radio" name="radio" />
            <span>Sign In</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Create An Account</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Albums</span>
          </label>
        </div>
      </div>
      <p>WORDS</p>
      <p>fdsa</p>
      <p>asdf</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Words</p>
      </main>
    </div>
  );
}