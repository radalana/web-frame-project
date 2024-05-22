const express = require('express');
const app = express(); //express server gestartet
const cors = require('cors');
app.use(cors());//cross origin request zu ermöglichen

//um mit json files zu arbeiten
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// ------Middleware (start)-------

/*
app.use((req, res, next) => {
    // middleware function
    console.log('My first middleware');
    next(); //wird die nächste middleware aufgerufen von express
});

app.use((req, res) => {
    res.end('Middleware finished');
});
*/
// ------Middleware (end)-------

//hauptseite
app.get('/', (req, res)  => {
    console.log('hello world'); //in console, not browser!
    res.send('GET Request to ...');
});


//POST route
app.post('/login', (req, res)  => {
    const loginData =JSON.stringify(req.body);//data from form
    console.log(loginData);

    //login in db

    res.status(200).json({
        message: 'Hello Login from express.js'//selbstdefiniert
    }); //um json file an der Client zurück zu schicken
});


//damit express.js alle angelegte routen als module exportiert, um in node.js server zu verwenden
module.exports = app;