import './App.scss';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { access_token, logout, getCurrentUserProfile} from './spotify';
import {catchErrors} from './utils'
import {Home} from './pages/exports.js'
import {Playlist} from './pages/exports.js'

import DaftPunk from './images/artists/daftpunk.jpeg';
import Donuts from './images/albumcovers/donuts.jpeg';
import BlackonBothSides from './images/albumcovers/BlackonBothSides.jpeg';
import CollegeDropout from './images/albumcovers/collegedropout.jpeg';
import MaggotBrain from './images/albumcovers/maggotbrain.jpeg';
import Paul from './images/albumcovers/paulsbotique.png';
import Endtroducing from './images/albumcovers/endtroducing.jpeg';
import MoneyStore from './images/albumcovers/themoneystore.jpeg';
import DownwardSpiral from './images/albumcovers/thedownwardspiral.png';
import SinceILeftYou from './images/albumcovers/sinceileftyou.jpeg';
import LowEndTheory from './images/albumcovers/thelowendtheory.jpeg';
import Discovery from './images/albumcovers/discovery.png';
import ICare from './images/albumcovers/ICareBecauseYouDo.jpeg';


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
    console.log("")

  return (
    <div className="App">
        {!token ? (                                         //Display Login Button if not logged in
        <>
    <div className = "header"></div>
      <div className='wrapper'>
       <div className = "welcomeText">
           <h1 className = "welcomeTextAnimation">Welcome to (website title here) ! </h1>
           <p className = "welcomeTextAnimationP">Before we can get started making you quality recommendations, we need you authorize this application with Spotify below.  </p>
           <a className="button" href="http://localhost:8888/login"> LOGIN TO SPOTIFY </a>
        </div> 
      </div>
      <div class="slideshow">
           <div class="move">
             <img src= {Donuts}/> 
             <img src= {ICare}/>
             <img src= {MaggotBrain}/>
             <img src= {BlackonBothSides}/>
             <img src= {CollegeDropout}/>
             <img src= {Discovery}/>
             <img src= {MoneyStore}/>
             <img src= {SinceILeftYou}/>
             <img src= {LowEndTheory}/>
             <img src= {Paul}/>
             <img src= {Endtroducing}/>
             <img src= {DownwardSpiral}/>
          </div>
        </div>
      </>
        ) : (
      <>
      <div className = "header">
         {profile && (
        <div className = "userInfo">
          <h1 className = "profileName">{profile.display_name}</h1>
          <p className='followerCount'>{profile.followers.total} Followers</p>
          <div><button className = "buttonHeader" onClick = {logout}> LOGOUT</button></div>
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
              <Route path="/playlist">
                <Playlist/>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
          </>
        )}
        <footer>
          <p className='footerText'>Capstone Project for Fordham University made by Zalen Nelson</p>
        </footer>
    </div>
  );
}

export default App;
