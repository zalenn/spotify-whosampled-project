# spotify-whosampled-project

![](https://github.com/zalenn/spotify-whosampled-project/blob/main/PlaylistMakerDemo.gif)




Known Issues: 

1.) The script has trouble parsing songs that contains features due to the fact they have parentheses in the song title on Spotify(i.e "All Eyez On Me" by 2Pac ft. Big Syke will return no sample despite the fact it samples "Never Gonna Stop" by Linda Clifford)

2.) Users may have to close the app completely/ clear the cache after a while due to the access token expiring without warning. This can be noticed since the search function will no longer return results and the logout button in the top right will disappear. 

3.) In some cases, the sample contained in the song simply does not exist on Spotify so the correct result will not appear
