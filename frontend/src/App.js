import './App.scss';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { access_token, logout, getCurrentUserProfile} from './spotify';
import {catchErrors} from './utils'
import styled from 'styled-components/macro';
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


  return (
    <div className="App">
      <header className="App-header">
        {!token ? (                                         //Display Login Button if not logged in
      <div className='wrapper'>
        <div className = "welcomeText">
           <h1>Welcome to (website title here) </h1>
           <p>Before we can get started making you quality recommendations, we need you authorize this application with Spotify below.  </p>
           <a className="button" href="http://localhost:8888/login"> LOGIN TO SPOTIFY </a>
        </div>
          <div class = "artistImg">
            <img src = {DaftPunk} alt = "Daft Punk"/>
         </div>
      </div>
        ) : (
          <>
          <h1>Logged In</h1>
          <button onClick={logout}>Logout</button>
          {profile && (
            <div>
              You are logged in as {profile.display_name}. This page is still under construction.
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>
            {profile.images.length > 0 && <img src={profile.images[0].url} alt="profilePicture" />}
            </div>
          )}
          </>
        )}
        <footer>
          <p>Capstone Project for Fordham University made by Zalen Nelson</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
