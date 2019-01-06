#!/usr/bin/env node

//import dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// database
//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/IVpokeGo';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())

// Welcome message when go on the / 
app.get('/', function(req, res){
res.json({"welcome" : "Etchebstia REST API "});
});

//////////////////////////////////////////////////////////////////////////////////////////////
// MVC of Pokemons stats

var Schema = mongoose.Schema;

var FicheSchema = new Schema({
  username: String,
  datasPokemons: []
});

var Fiche = mongoose.model("Fiche", FicheSchema);


// get all 
app.get('/fiche', function getAll(req, res){
    Fiche.find({}, 'username datasPokemons', function (error, All) {
        if (error) { console.error(error); }
        res.send({
          All: All
        })
      })
})
// get one
app.get('/fiche/:username', function getFiche(req, res){
    Fiche.find({username: req.params.username}, 'username datasPokemons', function (error, fiche) {
        if (error) { console.error(error); }
        res.send(fiche)
      })  
})

// add one fiche to bdd
app.post('/fiche', function(req,res){
    var username = req.body.username;
    var datasPokemons = req.body.datasPokemons;  
    console.log(req.body)
    
    var new_fiche = new Fiche({
      username: username,
      datasPokemons: datasPokemons
    })
    
    
    new_fiche.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Fiche saved successfully!',
        data: new_fiche
      })
      console.log(new_fiche)
    })
})
   
// delete one
app.delete('/fiche/:id', function(req,res){
    Fiche.remove({
        _id: req.params.id
      }, function(err, fiche){
        if (err)
        res.send(err)
        res.send({
          success: true,
          message: "fiche deleted",
          data: fiche
        })
      })  
})

app.delete('/fiche', function(req,res){
    Fiche.remove({}, function(err, fiche){
        if (err)
        res.send(err)
        res.send({
          success: true,
          message: "all fiches deleted",
        })
      })  
})








// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(process.env.PORT || 9000, function(){
 console.log('Node server listening on port 9000');
});
