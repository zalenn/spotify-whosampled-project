import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch, getRecommendations, getAudioFeatures } from '../../spotify';
import './home.scss';
import Playlist from '../playlist/playlist';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [foundSample, setFoundSample] = useState(false);
  const [sampledSong, setSampledSong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await getSearch(search, 'track');
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onContinue = async (e) => {
    e.preventDefault();
    if (firstResult) {
      try {
        const { data } = await getAudioFeatures(firstResult.id);
        setAudioFeatures(data);
        setIsLoading(true);
        const songName = firstResult.name;
        const artistName = firstResult.artists[0].name;
        const response = await axios.get(`http://localhost:8888/?song=${songName}&artist=${artistName}`);
        console.log(response);

        if (response.status === 200) {
          console.log("Found a sample for this song on Whosampled.com")
          const {data} = await getSearch(response.data.sampleName + response.data.sampleArtist, 'track');
          console.log("Sample name: " + data.tracks.items[0].name)
          let sampledSongResults = data.tracks.items;
  
          if (sampledSongResults.length === 0) {
            setFoundSample(false);
            console.log("This song contains a sample, but we couldn't find it on Spotify ")
          } else {
            setFoundSample(true);
            setSampledSong(sampledSongResults[0]);
            console.log("This song contains a sample, AND we found it on Spotify!")
            console.log("Song Result on Spotify: " + sampledSongResults[0].name)
          }
        } 
      } catch (error) {
        console.log(error);
        console.log("Couldn't find a sample for this song on Whosampled.com")
        setFoundSample(null);
      }
      setIsLoading(false);
    }
  };

  const history = useHistory();
  
  const firstResult = searchResults.length > 0 ? searchResults[0] : null;

  return (
    <>
        <div className="main">
          <h1>Welcome To (website title)</h1>
          <p>To start making you a playlist, please enter a song below.</p>
          <form onSubmit={onSubmit}>
            <div className="songInputDiv">
              <input
                className="songInput"
                type="text"
                placeholder="Enter a song here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="buttonSubmit">
                Search
              </button>
            </div>
          </form>
       {isLoading ? (
          <div className="loadingSpinner">Loading...</div>
          ) : (foundSample ? (
       <>
          <div className="songResult">
             <img src={sampledSong.album.images[0].url} alt={sampledSong.album.name} className="albumCover" />
            <div className="songInfo">
              <p className="songName">{sampledSong.name}</p>
              <p className="songArtist">{sampledSong.artists[0].name}</p>
              <p className="songYear">{sampledSong.album.release_date.substring(0, 4)}</p>
           </div>
         </div>
       <div className="songSelection">
         <p className='songSelectionText'> "{firstResult.name}" samples: "{sampledSong.name}" by "{sampledSong.artists[0].name}" Would you like to create a playlist based off this song? </p>
        <Link to={{pathname: "/playlist", search: `?searchSong=${firstResult.name}&searchArtist=${firstResult.artists[0].name}&sampledSong=${sampledSong.name}sampledArtist=${sampledSong.artists[0].name}`}}>
           <button className="buttonSubmit">Create My Playlist</button>
        </Link>
       </div>
     </>
         ) : (foundSample === null ? (
            <>
             <div className="errorText">Either this song does not contain a sample or its not avaliable in the Whosampled database :(</div>
             <div className="errorText">Please refresh the page and search for another song.</div>
            </>
       ) : (firstResult ? (
       <>
     <div className="songResult">
        <img src={firstResult.album.images[0].url} alt={firstResult.album.name} className="albumCover" />
       <div className="songInfo">
        <p className="songName">{firstResult.name}</p>
        <p className="songArtist">{firstResult.artists[0].name}</p>
        <p className="songYear">{firstResult.album.release_date.substring(0, 4)}</p>
       </div>
    </div>
      <div className="songSelection">
         <p className='songSelectionText'>Is this the song you were looking for? If not, please again and specify an artist as well.</p>
        <button className="buttonSubmit" onClick={onContinue}>Yes , Continue</button>
    </div>
     </>
   ) : ( 
     <>
       <div className="errorText">No song found/searched currently.</div>
     </>
  ))))}
      </div>
    </>
  );
};
export default Home;
