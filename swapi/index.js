#!/usr/bin/env node
const https = require('https');

let firstName = "Luke";
let lastName = "Skywalker";

function searchPeople (firstName, lastName){
        return {
                hostname:'swapi.co',
                path:`/api/people/?search=${firstName}+${lastName}`
        };
}

function makeRequest(options, callback) {
        const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`);

                let responseString = "";

                res.on('data', d => {
                        responseString += d;
                });

                res.on('end', () => {
                        let responseJSON = JSON.parse(responseString);
                        callback(responseJSON, null);
                })
        });

        req.end();
}


let options = searchPeople(firstName, lastName);

makeRequest(options, (data, error) => {
        let person = data.results[0];

        if (person) {
                let response = `${person.name} is ${person.height} cm tall.`;
                console.log(response);
        } else {
                console.error(error);
        }
})