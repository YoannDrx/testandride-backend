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

        // les paramètres de requêtes construits avec le lien cité plus haut
        const queryParams = `fields%5B%5D=Statut&fields%5B%5D=Link+to+Clients&fields%5B%5D=feedbacks_produit&fields%5B%5D=client_prenom_nom&fields%5B%5D=date_essai&fields%5B%5D=Mod%C3%A8le&fields%5B%5D=date_booking&fields%5B%5D=client_telephone&fields%5B%5D=client_adresse&fields%5B%5D=Rider_id+%F0%9F%91%AA&fields%5B%5D=Course_id&fields%5B%5D=Relance+SMS&fields%5B%5D=envoi_formulaire&fields%5B%5D=client_email&fields%5B%5D=Marques+%F0%9F%9B%8D%EF%B8%8F+(from+Mod%C3%A8le)&fields%5B%5D=Rider_email&fields%5B%5D=Fait+%E2%9C%85&fields%5B%5D=commentaires_client&fields%5B%5D=Programm%C3%A9+%F0%9F%94%9C&filterByFormula=IS_SAME(date_essai%2C+'${date}'%2C+'days')`;

        console.log('route airtable');
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
            res.json({result:false,data})
        }
    })


    // Update one record from Courses from airtable with record ID
    router.post('/:recordId', async (req,res)=>{
        console.log('route record airtable');
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
