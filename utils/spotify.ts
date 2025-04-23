import * as dotenv from 'dotenv';
import fetch from "node-fetch";
import { fetchAlbum, fetchArtist, createAlbum, createArtist } from "../utils/api.ts";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString("base64");

  const body = new URLSearchParams({
    grant_type: "client_credentials",
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Token fetch failed: ${res.status} ${JSON.stringify(error)}`);
  }

  const data: any = await res.json();
  return data.access_token;
}




export async function spotfetchAlbums(query: string, limit: number = 15): Promise<void> {
  const token = await getAccessToken();
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=${limit}`;

  console.log("Fetching:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: any = await res.json();

  const albums = data.albums?.items || [];

  albums.forEach(async (album: any, index: number) => {
    console.log(`${index + 1}. ${album.name} (ID: ${album.id}) (Name: ${album.artists[0].name})`);

    const artistRes = await fetchArtist("Artist_Name", album.artists[0].name);

    console.log(artistRes.AId);

    if(artistRes) {
        const slug = album.name.toLowerCase().replace(/\s+/g, '-');
        createAlbum(artistRes.AId, album.id, album.name, "Whateva", album.images[0].url, slug);
    }
  });
}

export async function spotfetchArtists(query: string, limit: number = 15): Promise<void> {
  const token = await getAccessToken();
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`;

  console.log("Fetching:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: any = await res.json();

  const artists = data.artists?.items || [];

  artists.forEach(async (artist: any, index: number) => {
    console.log(`${index + 1}. ${artist.name} (ID: ${artist.id}) (Name: ${artist.popularity}), ${artist.images[0].url}`);

    const artistRes = await fetchArtist("Artist_Name", artist.name);

    if(!artistRes) {
        const slug = artist.name.toLowerCase().replace(/\s+/g, '-');
        createArtist(artist.id, artist.name, "Whateva", artist.images[0].url, slug );
    }
  });
}


