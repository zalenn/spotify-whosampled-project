const puppeter = require('puppeteer'); 

//https://stackoverflow.com/questions/55388455/get-href-attribute-in-pupeteer-node-js

(async () => {

    // Artist such as Beyoncé have special characters in their name and will not work if not spelled exactly right.
    // If artist name is longer than one word, please enter hyphen between each word.

    let artist = "Lizzo"
    let song = "About-Damn-Time"
    let sample = true

    const browser = await puppeter.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(`https://www.whosampled.com/${artist}/${song}/`);

   let sampleName = "";
   let sampleArtist = "";


    try { 
          sampleName = await page.$eval( ".trackName", el => el.textContent.trim());
          sampleArtist = await page.$eval(".trackArtist", el => el.textContent.trim());
   
    } catch (error) {

        console.log("This song doesn't contain any samples :( or you entered the wrong artist or song name. Please try again.")
        sample = false
    }


     let testHeader = await page.$eval( ".sectionHeader", el => el.textContent.trim()) 
     console.log(testHeader)

    // Whosampled.com also keeps track of if the song your currently looking at was sampled or covered in another song in the future. We are only interested in the songs that the current song samples. To address this, we will check the section header of the page to see if it contains the string "Contains samples of" to make sure that we are getting the correct information. This string will always exist on the page if the song contains a sample but never if it does not.

    try {
        testHeader = await page.$eval( ".sectionHeader", el => el.textContent.trim())   
        if (testHeader.includes("Contains samples of") == false) {                // if we don't find this string in the section header, the song contains no samples. 
            sample = false
        }
    }  catch (error) {
        console.log("This song doesn't contain any samples :( or you entered the wrong artist or song name. Please try again.")
    }


   switch (sample) {
    case true:
       console.log("You entered: " + song + " "+ "by " + artist);  
       console.log("This song samples " + sampleName + " " + sampleArtist);
       break;
   }

    await browser.close(); 
    

})();