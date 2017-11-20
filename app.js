//Importing packages
const express = require('express');
const request = require('request');
const promise = require('promise');

//Creating Express app
const app = express();


//Sets the options for the http GET request to the API
function requestOptions(month_and_year) {
    if (month_and_year === 'all') {
        return({
            url: 'https://data.marincounty.org/resource/mw3d-ud6d.json',
            json: true
        })
    } else {
        return({
            url: 'https://data.marincounty.org/resource/mw3d-ud6d.json',
            qs: {
                'month_and_year': month_and_year
            },
            json: true
        })
    }
}


//Returns the total amount per department for a given month
function retrieveData(month_and_year){
    let options = requestOptions(month_and_year);
    return new promise((resolve, reject) => {
        request.get(options, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(sumByDepartment(body));
            }
        });
    });
}


//Returns the total sum amounts for a given set of contracts
/*It is faster to build a dictionary with department keys and amount values from the JSON we retrieve
but returning a JSON is more convenient to build the chart */
function sumByDepartment(contracts) {
    let sumAmountsDict = {};
    for (let i=0; i < contracts.length; i++) {
        let dpt = contracts[i].department;
        if (dpt in sumAmountsDict) {
            sumAmountsDict[dpt] += parseInt(contracts[i].amount);
        } else {
            sumAmountsDict[dpt] = parseInt(contracts[i].amount);
        }
    }
    let sumAmountsJSON = [];
    for (let department in sumAmountsDict) {
        sumAmountsJSON.push({'department' : department, 'amount' : sumAmountsDict[department]})
    }
    return(sumAmountsJSON);
}


//Serving static files
app.use(express.static('static'));


//Serving index.html
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html')
});


//Serving the total amounts per department
app.get('/amounts/:month_and_year', (req, res) => {
    let month_and_year = req.params.month_and_year;
    retrieveData(month_and_year).then(
        (data) => res.status(200).send(data),
        (err) => console.log(err),
    );
});


//Checking if the server is listening on port 3000
app.listen(3000, () => {
    console.log('listening on 3000')
});