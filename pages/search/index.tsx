"use client";
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [artistSearch, setArtistSearch] = useState('');
  const [albumSearch, setAlbumSearch] = useState('');

  const handleArtistSearch = (e: any) => {
    e.preventDefault();
    if (artistSearch) {
      router.push(`/search/artist/${artistSearch}`);
    }
  };

  const handleAlbumSearch = (e: any) => {
    e.preventDefault();
    if (albumSearch) {
      router.push(`/search/album/${albumSearch}`);
    }
  };

  return (
    <div>
      <div className="frontpageHeader">
        <form>
          <p className="spaceDownBro">Search for artist</p>
          <input 
            className='search'
            name="artistSearch" 
            type="search" 
            placeholder="ex: John Coltrane"
            value={artistSearch}
            onChange={(e) => setArtistSearch(e.target.value)}
          />
          <button 
            onClick={handleArtistSearch} 
            type="submit" 
            className="searchButton"
          >
            Search
          </button>

          <p className="spaceDownBro">Search for album</p>
          <input 
            className='search'
            name="albumSearch" 
            type="search" 
            placeholder="ex: Kind of Blue"
            value={albumSearch}
            onChange={(e) => setAlbumSearch(e.target.value)}
          />
          <button 
            onClick={handleAlbumSearch} 
            type="submit" 
            className="searchButton"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
