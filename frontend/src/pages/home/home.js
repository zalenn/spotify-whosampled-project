import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch } from '../../spotify';
import './home.scss';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

const [selectedArtist, setSelectedArtist] = useState("");

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

  const onContinue = () => {
    // Handle continue button click here
    console.log('User selected song:', selectedSong);
  };

  function addDashToSpaces(str) {
    return str.split(' ').join('-');
  }

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
            <button type="submit" className="buttonSubmit">Search</button>
          </div>
        </form>
        {isLoading ? (
          <div className="loadingSpinner">
            Loading...
          </div>
        ) : firstResult ? (
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
              <button className="buttonSubmit" onClick={() => setSelectedSong(firstResult)}>Yes , Continue</button>
          </div>
          </>
        ) : <> <div className='errorText'>No song found/selected yet.</div> </>}
      </div>
    </>
  );
};

export default Home;
