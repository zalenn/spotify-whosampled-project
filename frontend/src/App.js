import './App.scss';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { access_token, logout, getCurrentUserProfile} from './spotify';
import {catchErrors} from './utils'
import {Home} from './pages/exports.js'
import DaftPunk from './images/artists/daftpunk.jpeg';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    setToken(access_token);
    
    const fetchData = async () => {
        const {data} = await getCurrentUserProfile();
        setProfile(data);
   //   console.log(data);
     }
     catchErrors(fetchData());
    }, []);

    console.log(access_token);

  return (
    <div className="App">
        {!token ? (                                         //Display Login Button if not logged in
      <div className='wrapper'>
        <div className = "welcomeText">
           <h1 className = "welcomeTextAnimation">Welcome to (website title here) ! </h1>
           <p className = "welcomeTextAnimationP">Before we can get started making you quality recommendations, we need you authorize this application with Spotify below.  </p>
           <a className="button" href="http://localhost:8888/login"> LOGIN TO SPOTIFY </a>
        </div>
          <div className = "artistImg">
            <img src = {DaftPunk} alt = "Daft Punk"/>
         </div>
      </div>
        ) : (
          <>
      <div className = "header">
         {profile && (
        <div className = "userInfo">
          <h1 >{profile.display_name}</h1>
          <p>{profile.followers.total} Followers</p>
          {profile.images.length && profile.images[0].url && (
            <img src={profile.images[0].url} alt="Avatar"/>
          )}
          <button className = "button" onClick = {logout}> LOGOUT</button>
        </div>
        )}
      </div>
          <Router>
            <Switch>
              <Route path="/top-artists">
                <h1>Top Artists</h1>
              </Route>
              <Route path="/top-tracks">
                <h1>Top Tracks</h1>
              </Route>
              <Route path="/playlists/:id">
                <h1>Playlist</h1>
              </Route>
              <Route path="/playlists">
                <h1>Playlists</h1>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
          </>
        )}

        <footer>
          {/* <p>Capstone Project for Fordham University made by Zalen Nelson</p> */}
        </footer>
    </div>
  );
}

export default App;