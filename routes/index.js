var express = require('express');
var router = express.Router();
const uniqid = require("uniqid");


// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Setting up cloudinary
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure cloudinary
router.post("/upload", async (req, res) => {
    try {
        const photoPath = `./tmp/${uniqid()}.jpg`;
        const resultMove = await req.files.photoFromFront.mv(photoPath);

        if (!resultMove) {
            const resultCloudinary = await cloudinary.uploader.upload(photoPath);

            // delete the file from the tmp folder
            fs.unlinkSync(photoPath);

            // if the file was moved successfully, send the url to the front
            res.json({ result: true, url: resultCloudinary.secure_url });
        } else {
            // if the file was not moved successfully, send the error to the front
            res.status(500).json({ result: false, error: "Error uploading image" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, error: "Error uploading image" });
    }
});

module.exports = router;