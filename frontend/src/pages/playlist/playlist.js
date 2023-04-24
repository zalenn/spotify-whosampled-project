import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch } from '../../spotify';
import './playlist.scss';
import { useLocation } from 'react-router-dom';


const Playlist = () => {
  const [profile, setProfile] = useState(null);

  const location = useLocation();
  const searchSong = new URLSearchParams(location.search).get('searchSong');
  const searchArtist = new URLSearchParams(location.search).get('searchArtist');
  const sampledSong = new URLSearchParams(location.search).get('sampledSong');
  const sampledArtist = new URLSearchParams(location.search).get('sampledArtist');

  return (
    <div class="container">
  <div class="card">
    <h3 class="title">{searchSong}</h3> 
    <h3>Title</h3>
    <h3>Year</h3>
    <div class="bar">
    <ul>
       <li>Acousticness:</li>
       <li>Danceability: </li>
       <li>Energy: </li>
       <li>Instrumentalness: </li>
       <li>Liveness: </li>
       <li>Loudness: </li>
       <li>Speechiness: </li>
       <li>Tempo: </li>
        <li>Valence: </li>
      </ul>
    </div>
  </div>
  <div class="card">
    <h3 class="title">Card 2</h3>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
  </div>
  <div class="card">
    <h3 class="title">Card 3</h3>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
  </div>
  <div class="card">
    <h3 class="title">Card 4</h3>
    <div class="bar">
      <div class="emptybar"></div>
      <div class="filledbar"></div>
    </div>
  </div>
</div>
 
  );
};

export default Playlist;
