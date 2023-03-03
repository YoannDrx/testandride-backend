var express = require("express");
var router = express.Router();
require("../models/connection");
const { getAirtable,updateRecord } = require("../modules/airTable");



// Get Table from airtable
router.get('/',async (req,res)=>{
    console.log('route airtable');
    const data = await getAirtable();
    if (data){
        res.json({result:true,data})
    } else {
        res.json({result:false,data})
    }
})

// update status of meeting record from airtable with id

router.post('/:recordId', async (req,res)=>{
    console.log('route record airtable');
    const data = await updateRecord(req.params.recordId,req.body);
    if (data){
        res.json({result:true,data})
    } else {
        res.json({result:false,data})
    }
})

module.exports = router;
