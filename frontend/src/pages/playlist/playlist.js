import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch, getRecommendations, getAudioFeatures } from '../../spotify';
import './playlist.scss';
import { useLocation } from 'react-router-dom';

const Playlist = () => {
  const [profile, setProfile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [sampleResults, setSampleResults] = useState([]);
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
        const { data } = await getSearch(searchSong + searchArtist, 'track');
        setSearchResults(data.tracks.items);
        console.log(data.tracks.items[0]);
       
        const { data: sampleData } = await getSearch(sampledSong + sampledArtist, 'track');
        console.log(sampleData)
        setSampleResults(sampleData.tracks.items);
       
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, [searchSong, searchArtist, sampledArtist, sampledSong]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        if (sampleResults.length > 0) {
          console.log(sampleResults[0].id)
          const { data } = await getAudioFeatures(sampleResults[0].id);
          setAudioFeatures(data);
          console.log(data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    catchErrors(fetchFeatures());
  }, [sampleResults]);

  return (
    <div className= "main">
      {isLoading || searchResults.length < 0  ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading Song Attributes</p>
        </div>
      ) : (
        <>
           {searchResults.length > 0 && searchResults[0].album && (
            <div className = "orginalSongContainer">
             <div className="songResult">
                <img src={searchResults[0].album.images[0].url} alt={searchResults[0].album.name} className="albumCover" />
               <div className="songInfo">
                 <p className="songName">{searchResults[0].name}</p>
                 <p className="songArtist">{searchResults[0].artists[0].name}</p>
                 <p className="songYear">{searchResults[0].album.release_date.substring(0, 4)}</p>
              </div>
              <ul>
            <li>Acousticness: {audioFeatures.acousticness}</li>
            <li>Danceability: {audioFeatures.danceability}</li>
            <li>Energy: {audioFeatures.energy}</li>
            <li>Instrumentalness: {audioFeatures.instrumentalness} </li>
            <li>Liveness: {audioFeatures.liveness} </li>
            <li>Loudness: {audioFeatures.loudness} </li>
            <li>Speechiness: {audioFeatures.speechiness} </li>
            <li>Tempo: {audioFeatures.tempo} </li>
            <li>Valence: {audioFeatures.valence} </li>
          </ul>
            </div>
       </div>
          )}
        </>
      )}
    </div>
  );
};

export default Playlist;