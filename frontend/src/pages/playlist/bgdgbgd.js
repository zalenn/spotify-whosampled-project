  {/* <div className="songResult">
          <img
            src={searchResults.album.images[0].url}
            alt={searchResults.album.name}
            className="albumCover"
          />
          <div className="songInfo">
            <p className="songName">{searchResults.name}</p>
            <p className="songArtist">{searchResults.artists[0].name}</p>
            <p className="songYear">
              {searchResults.album.release_date.substring(0, 4)}
            </p>
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
       */}



       <ul>
       <li>Acousticness: {audioFeatures.acousticness}</li>
           <input type="range" min="0" max="1" step="0.0001" value={audioFeatures.acousticness} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, acousticness: parseFloat(event.target.value)})} />
       <li>Danceability: {audioFeatures.danceability}</li>
           <input type="range" min="0" max="1" step="0.001" value={audioFeatures.danceability} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, danceability: parseFloat(event.target.value)})} />
       <li>Energy: {audioFeatures.energy}</li>
           <input type="range" min="0" max="1" step="0.001" value={audioFeatures.energy} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, energy: parseFloat(event.target.value)})} />
       <li>Instrumentalness: {audioFeatures.instrumentalness} </li>
           <input type="range" min="0" max="1" step="0.00001" value={audioFeatures.instrumentalness} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, instrumentalness: parseFloat(event.target.value)})} />
       <li>Liveness: {audioFeatures.liveness} </li>
           <input type="range" min="0" max="1" step="0.001" value={audioFeatures.liveness} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, liveness: parseFloat(event.target.value)})} />
       <li>Loudness: {audioFeatures.loudness} </li>
           <input type="range" min="-60" max="0" step="0.001" value={audioFeatures.loudness} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, loudness: parseFloat(event.target.value)})} />
       <li>Speechiness: {audioFeatures.speechiness} </li>
           <input type="range" min="0" max="1" step="0.001" value={audioFeatures.speechiness} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, speechiness: parseFloat(event.target.value)})} />
       <li>Tempo: {audioFeatures.tempo} </li>
           <input type="range" min="0" max="200" step="0.001" value={audioFeatures.tempo} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, tempo: parseFloat(event.target.value)})} />
       <li>Valence: {audioFeatures.valence} </li>
           <input type="range" min="0" max="1" step="0.001" value={audioFeatures.valence} className="slider" id="myRange" onChange={(event) => setAudioFeatures({...audioFeatures, valence: parseFloat(event.target.value)})} />
  </ul>