import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getSearch } from '../../spotify';
import './playlist.scss';

const Playlist = () => {
  const [profile, setProfile] = useState(null);

  return (
    <> <div>PLaylist</div> </>
    
  );
};

export default Playlist;
