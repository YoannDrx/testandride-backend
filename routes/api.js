var express = require("express");
var router = express.Router();
require("../models/connection");

// Get Google Maps API key
router.get("/googlemaps", function(req, res) {
    console.log(process.env.GOOGLE_MAPS_APIKEY)
    try{
        const API_GOOGLE_MAPS = process.env.GOOGLE_MAPS_APIKEY;
        res.json({result: true, apiKey: API_GOOGLE_MAPS});
    }
    catch(error){
        res.json("Une erreur est survenue");
    }
});


module.exports = router;
