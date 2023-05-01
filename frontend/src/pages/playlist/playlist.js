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
        console.log(data.tracks.items[0]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    catchErrors(fetchData());
  }, [searchSong]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        if (searchResults.length > 0) {
          const { featureData } = await getAudioFeatures(searchResults[0].id);
          setAudioFeatures(featureData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    catchErrors(fetchFeatures());
  }, [searchResults]);

  return (
    <>
      {isLoading || searchResults.length < 0  ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading Song Attributes</p>
        </div>
      ) : (
        <>
           {searchResults.length > 0 && searchResults[0].album && (
             <>
             <div className="songResult">
                <img src={searchResults[0].album.images[0].url} alt={searchResults[0].album.name} className="albumCover" />
               <div className="songInfo">
                 <p className="songName">{searchResults[0].name}</p>
                 <p className="songArtist">{searchResults[0].artists[0].name}</p>
                 <p className="songYear">{searchResults[0].album.release_date.substring(0, 4)}</p>
              </div>
            </div>
       </>
          )}
        </>
      )}
    </>
  );
};

export default Playlist;