# spotify-whosampled-project

![](https://github.com/zalenn/spotify-whosampled-project/blob/main/PlaylistMakerDemo.gif)


# Overview
This project was done as Capstone Project for Fordham University's Master Program in Computer Science. I wanted to choose a project that would challenge me, but also intertwine topics I was interested in (all while being managable to complete within a semester). I had done one previous beginner project involving React and NoSQL, so I wanted to 






# How To Run
Make sure you have the latest version of node.js installed on your computer. 
Please not this will not run past the login screen as is due to the client secret and ID not being publicly available. You must create your own .env file and insert the following (https://developer.spotify.com/): 

CLIENT_ID = ``` your client ID goes here ``` <br />
CLIENT_SECRET = ``` your client_secret goes here ``` <br />
REDIRECT_URI = http://localhost:8888/callback ``` make sure to add this within your project settings in the Spotify dashboard ```<br />
FRONTEND_URI = http://localhost:3000 <br />


Then be sure to install node libraries 
- concurrently (to run the client and server at the same time)
- axios (handle API calls)
- express (server)
- dotenv
- react-scripts
- web-vitals


# Known Issues: 

1.) The script has trouble parsing songs that contains features due to the fact they have parentheses in the song title on Spotify (i.e "All Eyez On Me" by 2Pac ft. Big Syke will return no sample despite the fact it samples "Never Gonna Stop" by Linda Clifford). I will look into correcting this bug in the near future.

2.) Users may have to close the app completely/ clear the cache after a while due to the access token expiring without warning. This can be noticed since the search function will no longer return results and the logout button in the top right will disappear. 

3.) In some cases, the sample contained in the song simply does not exist on Spotify so the correct result will not appear. 




# Credits 
I'd like to thank Professor Nikitas Kounavelis and my classmates in my Capstone Project class for their feedback and encouragement while making this project. I'd also like to link Brittany Chiang's "Spotify Connected App" course/tutorial, since it was a big help in the beginning stages of this project to learn how to use Spotify's API and set up the OAuth process properly. [You can visit the course by clicking this link] (https://www.newline.co/courses/build-a-spotify-connected-app/welcome).
