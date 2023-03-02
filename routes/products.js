var express = require("express");
var router = express.Router();
require("../models/connection");
const Product = require("../models/products");

// *** CRUD OPERATIONS ***

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new product
router.post("/create", async (req, res) => {
    try {
        const product = new Product({
            model: req.body.model,
            brand_id: req.body.brand_id,
            descriptionText: req.body.descriptionText,
            descriptionFile: req.body.descriptionFile,
            picture: req.body.picture,
            
            price: req.body.price,
            created: new Date(),
            lastModified: new Date(),
        });
        await product.save();
        res.json({ result: true, message: `Produit ${product.name} créé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a product
router.put("/update/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.model = req.body.model;
        product.brand_id = req.body.brand_id;
        product.descriptionText = req.body.descriptionText;
        product.descriptionFile = req.body.descriptionFile;
        product.picture = req.body.picture;
        product.prices = req.body.prices;
        product.lastModified = new Date();
        product.author = req.body.author;
        product.lastModifier = req.body.lastModifier;
        await product.save();
        res.json({ result: true, message: `Produit ${product.name} modifié` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Delete a product
router.delete("/delete/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.remove();
        res.json({ result: true, message: `Produit ${product.name} supprimé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

module.exports = router;
