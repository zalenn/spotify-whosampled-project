import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch, getRecommendations, getAudioFeatures } from '../../spotify';
import './playlist.scss';
import { useLocation } from 'react-router-dom';


const Playlist = () => {
  const [profile, setProfile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const searchSong = new URLSearchParams(location.search).get('searchSong');
  const searchArtist = new URLSearchParams(location.search).get('searchArtist');
  const sampledSong = new URLSearchParams(location.search).get('sampledSong');
  const sampledArtist = new URLSearchParams(location.search).get('sampledArtist');


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await getSearch(searchSong, 'track');
        setSearchResults(data.tracks.items);
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await getAudioFeatures(searchResults[0].id);
        setAudioFeatures(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, []);

  return (


    <>

<ul>
       <li>Acousticness: {audioFeatures.acousticness}</li>
       <li>Danceability: {audioFeatures.danceability}</li>
       <li>Energy:  {audioFeatures.energy}</li>
       <li>Instrumentalness: {audioFeatures.instrumentalness} </li>
       <li>Liveness: {audioFeatures.liveness} </li>
       <li>Loudness: {audioFeatures.loudness} </li>
       <li>Speechiness: {audioFeatures.speechiness} </li>
       <li>Tempo: {audioFeatures.tempo} </li>
        <li>Valence:{audioFeatures.valence} </li>
      </ul>
    
    </>
    
//   <div class="container">
//   <div class="card">
//     <h3 class="title">{searchSong}</h3> 
//     <div class="bar">
//     <ul>
//        <li>Acousticness: {audioFeatures.acousticness}</li>
//        <li>Danceability: {audioFeatures.danceability}</li>
//        <li>Energy:  {audioFeatures.energy}</li>
//        <li>Instrumentalness: {audioFeatures.instrumentalness} </li>
//        <li>Liveness: {audioFeatures.liveness} </li>
//        <li>Loudness: {audioFeatures.loudness} </li>
//        <li>Speechiness: {audioFeatures.speechiness} </li>
//        <li>Tempo: {audioFeatures.tempo} </li>
//         <li>Valence:{audioFeatures.valence} </li>
//       </ul>
//     </div>
//   </div>
//    <div class="card">
//     <h3 class="title"></h3>
//     <div class="bar">
//       <div class="emptybar"></div>
//       <div class="filledbar"></div>
//     </div>
//   </div>
// </div>

  );
};

export default Playlist;
