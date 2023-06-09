import axios from 'axios';

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export const logout = () => {
    // Clear all localStorage items
    for (const property in LOCALSTORAGE_KEYS) {
      window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location = window.location.origin;
  };
  

const refreshToken = async () => {
    try {
      // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
      if (!LOCALSTORAGE_VALUES.refreshToken ||
        LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
        (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
      ) {
        console.error('No refresh token available');
        logout();
      }
  
      // Use `/refresh_token` endpoint from our Node app
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);
  
      // Update localStorage values
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
  
      // Reload the page for localStorage updates to be reflected
      window.location.reload();
  
    } catch (e) {
      console.error(e);
    }
  };

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
      return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
  };


const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
      [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
      [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');
  
    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
      refreshToken();
    }
  
    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
      return LOCALSTORAGE_VALUES.accessToken;
    }
  
    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
      // Store the query params in localStorage
      for (const property in queryParams) {
        window.localStorage.setItem(property, queryParams[property]);
      }
      // Set timestamp
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      // Return access token from query params
      return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
  
    // We should never get here!
    return false;
  };

export const access_token = getAccessToken();


/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
axios.defaults.headers['Content-Type'] = 'application/json';


/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get('/me');

/**
 * Search for an Item
 * https://developer.spotify.com/documentation/web-api/reference/search
 * @returns {Promise}
 */

export const getSearch = (query, type) => axios.get(`/search?q=${query}&type=${type}`);


/**
 * Get Recomendations
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 * @returns {Promise}
 */

export const getRecommendations = (seed_artists, seed_genres, seed_tracks, limit, target_acousticness, target_danceability, target_energy, target_instrumentalness, target_liveness, target_speechiness, target_valence) => axios.get(`/recommendations?seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}&limit=${limit}&target_acousticness=${target_acousticness}&target_danceability=${target_danceability}&target_energy=${target_energy}&target_instrumentalness=${target_instrumentalness}&target_liveness=${target_liveness}&target_speechiness=${target_speechiness}&target_valence=${target_valence}`);


/**
 * Get Track's Audio Features
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 * @returns {Promise}
 */

export const getAudioFeatures = (id) => axios.get(`/audio-features/${id}`);

/**
 * Add Items to Playlist
 * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
 * @returns {Promise}
 */

export const addItemsToPlaylist = (playlist_id, uris) => axios.post(`/playlists/${playlist_id}/tracks?uris=${uris}`);

/**
 * Create Playlist
 * https://developer.spotify.com/documentation/web-api/reference/create-playlist
 * 
 */

export const createPlaylist = (user_id) => axios.post(`/users/${user_id}/playlists`);

// export const createPlaylist = (user_id, name, description, public_playlist) => axios.post(`/users/${user_id}/playlists`, {name: name, description: description, public: public_playlist});

/**
 * Get Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist
 * @returns {Promise}
 */

export const getPlaylist = (playlist_id) => axios.get(`/playlists/${playlist_id}`);

