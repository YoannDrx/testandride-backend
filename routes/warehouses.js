var express = require("express");
var router = express.Router();
require("../models/connection");
const Warehouse = require("../models/warehouses");

// *** CRUD OPERATIONS ***

// Get all warehouses
router.get("/", async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.json(warehouses);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one warehouse
router.get("/:id", async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        res.json(warehouse);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new warehouse
router.post("/create", async (req, res) => {
    try {
        const warehouse = new Warehouse({
            title: req.body.title,
            adresse: req.body.adresse,
        });
        await warehouse.save();
        res.json({ result: true, message: `Entrepôt ${warehouse.name} créé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a warehouse
router.put("/update/:id", async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        warehouse.name = req.body.name;
        warehouse.lastModified = new Date();
        await warehouse.save();
        res.json({ result: true, message: `Entrepôt ${warehouse.name} modifié` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Delete a warehouse
router.delete("/delete/:id", async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        await warehouse.remove();
        res.json({ result: true, message: `Lieu de stockage ${warehouse.name} supprimé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});


module.exports = router;
