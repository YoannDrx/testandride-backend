const fetch = require("node-fetch");

const personnalAccessToken = process.env.PERSONNAL_ACCESS_TOKEN;
const baseUrl = process.env.AIRTABLE_ENDPOINT_URL;
const tableId = process.env.AIRTABLE_TABLE_ID;
const baseId = process.env.AIRTABLE_BASE_ID;

const getAirtable = async () => {

    const response = await fetch(`${baseUrl}/${baseId}/${tableId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + personnalAccessToken
        },
     });
     const data = await response.json();
     return data
};

const updateRecord = async (recordId,update) => {

    const response = await fetch(`${baseUrl}/${baseId}/${tableId}/${recordId}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + personnalAccessToken
        },
        body:JSON.stringify({fields:update})
     });
     const data = await response.json();
     return data;
    
}

module.exports = { getAirtable,updateRecord };
