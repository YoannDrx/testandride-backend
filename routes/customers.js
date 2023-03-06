var express = require("express");
var router = express.Router();
require("../models/connection");
const Customer = require("../models/customers");

// *** CRUD OPERATIONS ***

// Get all customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one customer
router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.json(customer);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new customer
router.post("/create", async (req, res) => {
    try {
        const customer = new Customer({
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            tels:   req.body.tels,
            email:  req.body.email,
            address: req.body.address,
            author: req.body.author,
        });
        await customer.save();
        res.json({ result: true, message: `Client ${customer.lastName} créé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a customer
router.put("/update/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        customer.lastName = req.body.lastName;
        customer.firstName = req.body.firstName;
        customer.tels = req.body.tels;
        customer.email = req.body.email;
        customer.address = req.body.address;
        customer.lastModified = new Date();
        await customer.save();
        res.json({ result: true, message: `Client ${customer.lastName} modifié` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Delete a customer
router.delete("/delete/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        await customer.remove();
        res.json({ result: true, message: `Client ${customer.lastName} supprimé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});


module.exports = router;
