const express = require('express');
const router = express.Router();
const movies = require('../data/movie.json');
const fs = require('fs');
const path = require('path');


router.get('/', function(req, res){
    res.send(movies);
});

router.get('/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    const movie = movies.filter(function(movie){
        return movie.id === id;
    });
    res.send(movie);
});

router.post('/upload', function(req, res){
    let movie = req.body;
    movie.year = Number(movie.year);
    
    // get path
    const myPath = path.join(__dirname, '..', 'data', 'movie.json');

    // read file
    fs.readFile(myPath, 'utf8', (err, data)=>{
        let parsedData = JSON.parse(data);
        parsedData.push(movie);
        fs.writeFile(myPath, JSON.stringify(parsedData), (err)=>{
            if (err) throw err;
            console.log('movies update complete!');
            res.send('end');
        });
    }); 
});

module.exports = router;
