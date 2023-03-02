var express = require("express");
var router = express.Router();
require("../models/connection");
const Meeting = require("../models/meetings");

// *** CRUD OPERATIONS ***

// Get all meetings
router.get("/", async (req, res) => {
    try {
        const meetings = await Meeting.find();
        res.json(meetings);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Get one meeting
router.get("/:id", async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        res.json(meeting);
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Create a new meeting
router.post("/create", async (req, res) => {
    try {
        const meeting = new Meeting({
            user_id: req.body.user_id,
            startedDate: req.body.startedDate,
            endedDate: req.body.endedDate,
            adresse: req.body.adresse,
            status: req.body.status,
            isConversion: req.body.isConversion,
            product_id: req.body.product_id,
            feedback_id: req.body.feedback_id,
            customer_id: req.body.customer_id,
            warehouse_id: req.body.warehouse_id,
            type: req.body.type,
            date: req.body.date,
            codeRDV: req.body.codeRDV,
            created: new Date(),
            lastModified: new Date(),
            author: req.body.author,
            lastModifier: req.body.lastModifier,
        });
        await meeting.save();
        res.json({ result: true, message: `Rendez-vous créé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Update a meeting
router.put("/update/:id", async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        meeting.user_id = req.body.user_id;
        meeting.startedDate = req.body.startedDate;
        meeting.endedDate = req.body.endedDate;
        meeting.adresse = req.body.adresse;
        meeting.status = req.body.status;
        meeting.isConversion = req.body.isConversion;
        meeting.product_id = req.body.product_id;
        meeting.feedback_id = req.body.feedback_id;
        meeting.customer_id = req.body.customer_id;
        meeting.warehouse_id = req.body.warehouse_id;
        meeting.type = req.body.type;
        meeting.date = req.body.date;
        meeting.lastModified = new Date();
        meeting.lastModifier = req.body.lastModifier;
        await meeting.save();
        res.json({ result: true, message: `Rendez-vous modifié` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});

// Delete a meeting
router.delete("/delete/:id", async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        await meeting.remove();
        res.json({ result: true, message: `Rendez-vous supprimé` });
    } catch (error) {
        res.json("Une erreur est survenue");
    }
});



module.exports = router;
