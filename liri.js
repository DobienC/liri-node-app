require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment");
var divider = "\n=============================================================\n\n";

// console.log(keys.spotify);

var search = process.argv[2]
var term = "Drake";

if(process.argv.length > 4){
    term = process.argv.slice(3).join(" ");
}

// function Spotify(){
//     this.id = process.env.SPOTIFY_ID;
//     this.secret = process.env.SPOTIFY_SECRET;
// }
var spotify = new Spotify({
    id: "2fdca250603644438d6a4d33dc238c24",
    secret: "eb6035c1c8464507b59a07f709cf8477"
});


// Finds Concert
function findConcert(artist){
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function(response){
        var resData = response.data;
    
        var showData = [
            "\nName of the venue: " + resData[0].venue.name,
            "Location: " + resData[0].venue.city,
            "Date: " + moment(resData[0].datetime).format('L')

        ].join("\n\n");
        
        console.log(showData);
        
        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
        });
    })
}

// Finds Spotify Song
function findSpotify(song){
    spotify.search({type: 'track', query: song}, function(err, data){
        if (err) { return console.log("Error Occured: " + err)}
        var songData = data.tracks.items[0];
        
        // console.log(songData);

        var showData = [
            "\nArtist(s): " + songData.artists[0].name,
            "Song Name: " + songData.name,
            "Preview Link: " + songData.external_urls.spotify,
            "Album: " + songData.album.name
        ].join("\n\n");

        console.log(showData);
        
        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
        });
    }) 
}

// Finds Movie
function findMovie(movie){
    var URL = "http://www.omdbapi.com/?apikey=c9a682cc&t=" + movie;

    axios.get(URL).then(function(response){
        var resData = response.data;

        var showData = [
            "\nTitle: " + resData.Title,
            "Release Year: " + resData.Year,
            "IMDB Rating: " + resData.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + resData.Ratings[1].Value,
            "Country: " + resData.Country,
            "Language: " + resData.Language,
            "Plot: " + resData.Plot,
            "Cast: " + resData.Actors,
        ].join("\n\n");

        console.log(showData);
        
        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
        });
    })
}

// Read random.txt and do what it says
function readTxt(){
    fs.readFile("random.txt","utf-8", function(err, data){
        if(err) throw err;
        var list = data.split(",");
        var newSearch = list[0];
        var newTerm = list[1].substring(1,list[1].length-1);
        

        if(newSearch === 'concert-this'){
            console.log("concert search: " + newTerm);
            findConcert(newTerm); 
        } else if(newSearch === 'spotify-this-song'){
            console.log("spotify search");
            findSpotify(newTerm);
        } else if(newSearch === 'movie-this'){
            console.log("movie search: " + newTerm);
            findMovie(newTerm);
        }

        for(var i = 2; i < list.length; i=i+2){
            newSearch = list[i].substring(2);
            newTerm = list[i+1].substring(1,list[i+1].length-1);

            if(newSearch === 'concert-this'){
                console.log("concert search: " + newTerm);
                findConcert(newTerm); 
            } else if(newSearch === 'spotify-this-song'){
                console.log("spotify search");
                findSpotify(newRerm);
            } else if(newSearch === 'movie-this'){
                console.log("movie search: " + newTerm);
                findMovie(newTerm);
            }
        }
    })
}

if(search === 'concert-this'){
    console.log("concert search: " + term);
    findConcert(term); 
} else if(search === 'spotify-this-song'){
    console.log("spotify search");
    if(process.argv.length < 4){
        term = "The Sign";
    }
    findSpotify(term);
} else if(search === 'movie-this'){
    if(process.argv.length < 4){
        term = "Mr. Nobody";
        console.log("If you haven't watched "+'"'+"Mr. Nobody,"+'"'+" then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    }
    console.log("movie search: " + term);
    findMovie(term);
} else {
    console.log("do what it says");
    readTxt();
}
