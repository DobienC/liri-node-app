require("dotenv").config("./.env.txt");

var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var search = process.argv[2]

var term = process.argv.slice(3).join(" ");

var divider = "\n=============================================================\n\n";

function Spotify(){
    this.id = process.env.SPOTIFY_ID;
    this.secret = process.env.SPOTIFY_SECRET;
}

if(search === 'concert-this'){
    console.log("concert search: " + term);
    findConcert(term); 
} else if(search === 'spotify-this-song'){
    console.log("spotify search");
} else if(search === 'movie-this'){
    console.log("movie search: " + term);
    findMovie(term);
} else {
    console.log("do what it says");
    readTxt();
}

// Finds Concert
function findConcert(artist){
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function(response){
        var resData = response.data;
    
        var showData = [
            "\nName of the venue: " + resData[0].venue.name,
            "Location: " + resData[0].venue.city,
            "Date: " + resData[0].datetime
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


function readTxt(){
    fs.readFile("random.txt","utf-8", function(err, data){
        if(err) throw err;
        var list = data.split(",");
        var newSearch = list[0];
        var newTerm = list[1];
        
        if(newSearch === 'concert-this'){
            console.log("concert search: " + newTerm);
            findConcert(newTerm); 
        } else if(newSearch === 'spotify-this-song'){
            console.log("spotify search");
        } else if(newSearch === 'movie-this'){
            console.log("movie search: " + newTerm);
            findMovie(newTerm);
        }
    })

}