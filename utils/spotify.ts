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




export async function spotfetchAlbums(query: any, limit: number = 10): Promise<void> {
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

    const artistRes = await fetchArtist("AId", album.artists[0].id);
    const albumRes = await fetchAlbum("ALId", album.id)

    if(artistRes && !albumRes) {
        try{
            const slug = album.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        
            .replace(/[^a-z0-9-_]/g, '') 
            .replace(/-+/g, '-');       

            await createAlbum(artistRes.AId, album.id, album.name, "Whateva", album.images[0].url, slug);

            console.log("New Album Inserted:", album.name);
        } catch(error){
            console.log(error);
        }
    }
  });
}

export async function spotfetchArtists(query: any, limit: number = 50): Promise<void> {
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
    console.log(`${index + 1}. ${artist.name} (ID: ${artist.id}) (Name: ${artist.popularity}), ${artist.images[0].url}, ${artist.genres[0]}`);

    const artistRes = await fetchArtist("AId", artist.id);

    if(!artistRes) {
        try{
            const slug = artist.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        
            .replace(/[^a-z0-9-_]/g, '') 
            .replace(/-+/g, '-');      
            
            await createArtist(artist.id, artist.name, artist.genres[0], artist.images[0].url, slug );
            console.log("new artist inserted:", artist.name);
        } catch(error) {
            console.log(error); 
        }
    }
  });
}









async function searchAndInsertArtistByName(name: string): Promise<any | null> {
  const token = await getAccessToken();
  const query = encodeURIComponent(`artist:"${name}"`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error(`Failed to search for artist: ${name}`);
    return null;
  }

  const data: any = await res.json();
  const artist = data.artists?.items?.[0];
  if (!artist) {
    console.warn(`Artist not found on Spotify: ${name}`);
    return null;
  }

  // Check if artist exists in your database
  const artistRes = await fetchArtist("AId", artist.id);
  if (!artistRes) {
    try {
      const slug = artist.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-_]/g, '')
        .replace(/-+/g, '-');

      await createArtist(
        artist.id,
        artist.name,
        artist.genres[0] || "Unknown",
        artist.images[0]?.url || "",
        slug
      );
      console.log("New artist inserted:", artist.name);
    } catch (error) {
      console.error("Error inserting artist:", artist.name, error);
    }
  }

  return artist;
}


export async function insertAlbumsForArtistByName(artistName: string): Promise<void> {
  const artist = await searchAndInsertArtistByName(artistName);
  if (!artist) {
    console.warn(`Artist not found: ${artistName}`);
    return;
  }

  const artistId = artist.id;
  const token = await getAccessToken();
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error(`Failed to fetch albums for artist: ${artistName}`);
    return;
  }

  const data: any = await res.json();
  const albums = data.items || [];

  // Fetch artist from your database to get AId
  const artistRes = await fetchArtist("AId", artistId);
  if (!artistRes) {
    console.error(`Artist not found in DB after insertion: ${artistName}`);
    return;
  }

  for (const album of albums) {
    const existing = await fetchAlbum("ALId", album.id);
    if (!existing) {
      try {
        const slug = album.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-_]/g, '')
          .replace(/-+/g, '-');

        await createAlbum(
          artistRes.AId,
          album.id,
          album.name,
          "Whateva",
          album.images[0]?.url || "",
          slug
        );

        console.log("New Album Inserted:", album.name);
      } catch (err) {
        console.error("Error inserting album:", album.name, err);
      }
    }
  }
}


export async function insertAlbumsForMultipleArtistsByName(artistNames: string[]): Promise<void> {
  for (const name of artistNames) {
    console.log(`Processing artist: ${name}`);
    await insertAlbumsForArtistByName(name);
  }
}
