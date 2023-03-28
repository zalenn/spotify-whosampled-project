import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile } from '../../spotify';
import './home.scss';
import Donuts from '../../images/albumcovers/donuts.jpeg';
import Discovery from '../../images/albumcovers/discovery.png';
import MaggotBrain from '../../images/albumcovers/maggotbrain.jpeg';
import MoneyStore from '../../images/albumcovers/themoneystore.jpeg';
import CollegeDropout from '../../images/albumcovers/collegedropout.jpeg';
import ICare from '../../images/albumcovers/ICareBecauseYouDo.jpeg';
// import {Madvillany} from '../../images/albumcovers/madvillany.png';
import SinceILeftYou from '../../images/albumcovers/sinceileftyou.jpeg';


const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
   <div className = "main">
      <h1>Welcome To (website title)</h1>
      <p>To start making you a playlist, please enter a song below.</p>
       <div className ="songInputDiv"><input className='songInput' type = "text" placeholder = "Enter a song here"/></div>
   </div>


   </>
  )
};

export default Home;