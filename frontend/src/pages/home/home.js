import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch } from '../../spotify';
import './home.scss';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getSearch(search, 'track');
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

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
            <button type="submit" className = "buttonSubmit">Search</button>
          </div>
        </form>
        <div>
          {searchResults.map((result) => (
            <p key={result.id}>{result.name}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;