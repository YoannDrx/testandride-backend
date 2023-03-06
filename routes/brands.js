var express = require("express");
var router = express.Router();
require("../models/connection");
const Brand = require("../models/brands");

// *** CRUD OPERATIONS ***

// Get all brands
router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one brand
router.get("/:id", async (req, res) => {
    try {
        const brandFound = await Brand.findById(req.params.id);
        res.json(brandFound);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new brand
router.post("/create", async (req, res) => {
    try {
        const brandFound = new Brand({
            name: req.body.name,
            created: new Date(),
            lastModified: new Date(),
        });
        await brandFound.save();
        res.json({ result: true, message: `Marque ${brandFound.name} créée` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a brand
router.put("/update/:id", async (req, res) => {
    try {
        const brandFound = await Brand.findById(req.params.id);
        brandFound.name = req.body.name;
        brandFound.lastModified = new Date();
        await brandFound.save();
        res.json({ result: true, message: `Marque ${brandFound.name} modifiée` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// *** CRUD OPERATIONS ***

// Get all brands
router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one brand
router.get("/:id", async (req, res) => {
    try {
        const brandFound = await Brand.findById(req.params.id);
        res.json(brandFound);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new brand
router.post("/create", async (req, res) => {
    try {
        const brandFound = new Brand({
            name: req.body.name,
        });
        await brandFound.save();
        res.json({ result: true, message: `Marque ${brandFound.name} créée` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a brand
router.put("/update/:id", async (req, res) => {
    try {
        const brandFound = await Brand.findById(req.params.id);
        brandFound.name = req.body.name;
        brandFound.lastModified = new Date();
        await brandFound.save();
        res.json({ result: true, message: `Marque ${brandFound.name} modifiée` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

module.exports = router;
