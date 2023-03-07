var express = require("express");
var router = express.Router();
require("../models/connection");

const fetch = require("node-fetch");

const personnalAccessToken = process.env.PERSONNAL_ACCESS_TOKEN_PREPROD;
const baseUrl = process.env.AIRTABLE_ENDPOINT_URL;
const baseId = process.env.AIRTABLE_PREPROD_BASE_ID;

const tableCoursesId = process.env.AIRTABLE_PREPROD_COURSES_ID;
const tableRidersId = process.env.AIRTABLE_PREPROD_RIDERS_ID;
const tableBrandsId = process.env.AIRTABLE_PREPROD_BRANDS_ID;
const tableBikesId = process.env.AIRTABLE_PREPROD_BIKES_ID;
const tableClientsId = process.env.AIRTABLE_PREPROD_CLIENTS_ID;
const tableAcessoriesId = process.env.AIRTABLE_PREPROD_ACCESSORIES_ID;

// POur filter les requêtes il faut consulter cette URL https://codepen.io/airtable/full/MeXqOg

// *** COURSES ***
    // Get list of records from Courses from airtable
    router.get('/courses/',async (req,res)=>{
        console.log('route airtable');
        const response = await fetch(`${baseUrl}/${baseId}/${tableCoursesId}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer " + personnalAccessToken
            },
        });
        const data = await response.json();
        if (data){
            res.json({result:true,data})
        } else {
            res.json({result:false,data})
        }
    })

    // Get all courses records with a date from airtable
    router.get('/courses/:date',async (req,res)=>{

        // la date doit etre au format YYYY-MM-DD ex : http://localhost:3000/airtable/courses/2023-02-08
        const date = req.params.date;

        // les paramètres de requêtes construits avec celien : https://codepen.io/airtable/full/MeXqOg
        const queryParams = `filterByFormula=IS_SAME(date_essai%2C+'${date}'%2C+'days')&sort%5B0%5D%5Bfield%5D=date_essai&sort%5B0%5D%5Bdirection%5D=asc`;

       
        console.log('fetch url',`${baseUrl}/${baseId}/${tableCoursesId}?${queryParams}`);

        const response = await fetch(`${baseUrl}/${baseId}/${tableCoursesId}?${queryParams}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer " + personnalAccessToken
            },
        });
        const data = await response.json();
        if (data){
            res.json({result:true,data})
        } else {
            res.json({result:false,error:data.error})
        }
    })


    // get one model from base vélos
    router.get('/bike/:id',async (req,res)=>{

        const bikeId = req.params.id
       
       
      
        console.log('fetch url',`${baseUrl}/${baseId}/${tableBikesId}/${bikeId}`);
        const response = await fetch(`${baseUrl}/${baseId}/${tableBikesId}/${bikeId}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer " + personnalAccessToken
            },
        });
        const data = await response.json();
        if (data){
            res.json({result:true,data})
        } else {
            res.json({result:false,data})
        }
    })

    // Update one record from Courses from airtable with record ID
    router.post('/courses/:recordId', async (req,res)=>{

        console.log('route post update record airtable');

        // pour update un record il faut envoyer un objet {fields:{..update}} au record
        console.log('fetch post',`${baseUrl}/${baseId}/${tableCoursesId}/${req.params.recordId}`);
        const update = {...req.body}
        const response = await fetch(`${baseUrl}/${baseId}/${tableCoursesId}/${req.params.recordId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer " + personnalAccessToken
            },
            body:JSON.stringify({fields:update})
         });
         const data = await response.json();
        if (data){
            res.json({result:true,data})
        } else {
            res.json({result:false,data})
        }
    })




module.exports = router;
