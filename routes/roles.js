var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const Role = require("../models/roles");

// *** CRUD OPERATIONS ***

// Get all roles
router.get("/", async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one role
router.get("/:id", async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        res.json(role);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new role
router.post("/create", async (req, res) => {
    try {
        const role = new Role({
            name: req.body.name,
            isAdmin: req.body.isAdmin,
            isTesteur: req.body.isTesteur,
            isSupport: req.body.isSupport,
        });
        await role.save();
        res.json({ result: true, message: `Rôle ${role.name} créé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a role
router.put("/update/:id", async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        role.name = req.body.name;
        role.isAdmin = req.body.isAdmin;
        role.isTesteur = req.body.isTesteur;
        role.isSupport = req.body.isSupport;
        role.lastModified = new Date();
        await role.save();
        res.json({ result: true, message: `Rôle ${role.name} modifié` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Delete a role
router.delete("/delete/:id", async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        await role.remove();
        res.json({ result: true, message: `Rôle ${role.name} supprimé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

module.exports = router;
