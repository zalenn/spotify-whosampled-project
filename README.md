# spotify-whosampled-project

![](https://github.com/zalenn/spotify-whosampled-project/blob/main/PlaylistMakerDemo.gif)


#Overview
This 










# Known Issues: 

1.) The script has trouble parsing songs that contains features due to the fact they have parentheses in the song title on Spotify(i.e "All Eyez On Me" by 2Pac ft. Big Syke will return no sample despite the fact it samples "Never Gonna Stop" by Linda Clifford)

2.) Users may have to close the app completely/ clear the cache after a while due to the access token expiring without warning. This can be noticed since the search function will no longer return results and the logout button in the top right will disappear. 

3.) In some cases, the sample contained in the song simply does not exist on Spotify so the correct result will not appear






#Credits 
I'd like to thank Professor Nikitas Kounavelis and my classmates in my Capstone Project class for their feedback and encouragement while making this project. I'd also like to link Brittany Chiang's "Spotify Connected App" course/tutorial, since it was a big help in the beginning stages of this project to learn how to use Spotify's API and set up the OAuth process properly. [You can visit the course by clicking this link] (https://www.newline.co/courses/build-a-spotify-connected-app/welcome).
