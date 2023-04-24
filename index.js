const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const app = express();
const port = 8888;
const puppeteer = require('puppeteer'); 


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  

// Routes
app.get('/login', (req, res) => {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);    
    
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private ';

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope 
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          const { access_token, refresh_token, expires_in } = response.data;
  
          const queryParams = querystring.stringify({
            access_token,
            refresh_token,
            expires_in,
          });
  
          res.redirect(`${FRONTEND_URI}/?${queryParams}`);               // redirect user to frontend/react app
  
        } else {
          res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
      })
      .catch(error => {
        res.send(error);
      });
  });

  app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });


  app.get('/', async (req, res) => {
   
  function addDashToSpaces(str) {
      return str.split(' ').join('-');
    }

  function sanitizeString(str) {
    str = str.slice(0, -6);
    str = str.replace("by ", "");
    return str;
  }
   
  let {song, artist} = req.query;
  let sample = true

  artist = addDashToSpaces(artist)
  song = addDashToSpaces(song)

  console.log(song, artist)

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`https://www.whosampled.com/${artist}/${song}/`);

 try { 
       var sampleName = await page.$eval( ".trackName", el => el.textContent.trim());
       var sampleArtist = await page.$eval(".trackArtist", el => el.textContent.trim());
 
  } catch (error) {
      sample = false
  }


  var testHeader = ""

  try {
      testHeader = await page.$eval( ".sectionHeader", el => el.textContent.trim())   
      if (testHeader.includes("Contains") == false) {                // if we don't find this string in the section header, the song contains no samples. 
          sample = false
      }
  }  catch (error) {
     sample = false
  }

 switch (sample) {
  case true:
    sampleArtist = sanitizeString(sampleArtist)
    res.status(200).json({sampleName, sampleArtist});
    // res.redirect(`http://localhost:3000/playlist/`)
     break;
  case false:
    res.status(404).send("This song doesn't contain any samples :( or you entered the wrong artist or song name. Please try again.")
 }

  await browser.close(); 

  });
  

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});
