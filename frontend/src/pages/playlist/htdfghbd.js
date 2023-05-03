return (
    <div className="main">
      {isLoading || searchResults.length < 0 ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading Song Attributes</p>
        </div>
      ) : searchResults.length > 0 && searchResults[0].album ? (
        <>
          <Link to={{ pathname: "/" }}>
            <button className="buttonBack">Start Over</button>
          </Link>
          <div className="instructions">
            <p>Here are the attributes we found for the sampled song.</p>
            <p>Feel free to edit these attributes to your liking in order to create a playlist based off them.</p>
          </div>
          <div className="orginalSongContainer">
            <div className="songResult">
              <img src={searchResults[0].album.images[0].url} alt={searchResults[0].album.name} className="albumCover" />
              <div className="songInfo">
                <p className="songName">{searchResults[0].name}</p>
                <p className="songArtist">{searchResults[0].artists[0].name}</p>
                <p className="songYear">{searchResults[0].album.release_date.substring(0, 4)}</p>
              </div>
            </div>
          </div>

          <div className = "sampledSongContainer">
            <div className="songResult">
               <img src={sampleResults[0].album.images[0].url} alt={sampleResults[0].album.name} className="albumCover" />
              <div className="songInfo">
                <p className="songName">{sampleResults[0].name}</p>
                <p className="songArtist">{sampleResults[0].artists[0].name}</p>
                <p className="songYear">{sampleResults[0].album.release_date.substring(0, 4)}</p>
             </div>
           </div>
    <div class = "audioFeatures">
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
   </div>
 </div>


          <div>
            <button className="buttonCreate" onClick={onSubmit}>Create Playlist</button>
          </div>
        </>
      ) : (
        playlist ? (
          <>
            {/* playlist code here */}
          </>
        ) : null
      )}
    </div>
  );