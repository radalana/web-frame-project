const express = require('express');
const app = express(); //express server gestartet
const session = require('express-session');
const store = new session.MemoryStore();
const cors = require('cors');
app.use(cors());//cross origin request zu ermöglichen

//um mit json files zu arbeiten
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    cookie: {maxAge: 120000}, //2 min für checking
    saveUninitialized: false, //not generate new session every times
    resave: false,
    secret: 'my key'

}));

function authenticate(res, req, next) {
    const token = req.headers['authentication']; //это что
    if (!token) {
        return res.status(401).send({error: 'Token nicht vorhanden.'});
    }
    const session; //= get session[token];
    if (!session) {
        return res.status(401).send({error: 'Ungultige Token'});
    }
    req.user = session.username;
    next();
    
}
app.get('/', authenticate, (req, res)  => {
    res.send('Willcomen');
});
/*
app.get('/my', (req, res) => {
    console.log('LandingPage');
    res.status(200).send({message: 'Welcome'});
})
*/
function isUserRegistred(email) {
    return true;
}
function hash(password) {
    return password;
}





app.post('/users', (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        const {email, password, ...contactInformation} = userData;
        const hashedPassword = hash(password);
        const user = {email, hashedPassword, ...contactInformation};
        if (isUserRegistred(email)){
            res.status(409).json({message: `User with ${email} already exists`});
        }
        saveUserToDatabase(user);
        res.status(201).json({message: `User ${email} created successfully`});
    }catch(error) {
        res.status(500).json({ error: 'Internal Server Error gggg' });
    }
});

function checkPasswordForThisEmail(password, email) {
    return true;
}

function generateToken(password, email) {
    return password + email + Math.random();
}
app.post('/sessions', (req, res) => {
    const user = req.body;
    const email = user['email'];
    const password = user['password'];
    console.log(email, password);
    if (!isUserRegistred(email)) {//validate
        res.status(401).json({
            message: 'No user with this email exists'
         });
    }
    if (req.session.authentication) {
        res.status(201).json({ message: 'Already authenticated', token: req.session.authentication, redirectUrl: '/my'});
        //TODO: automated log in
    }else {
        if (checkPasswordForThisEmail(password, email)) {
            console.log('password passt');
            req.session.authentication = true;
            const token = generateToken(password, email);
            req.session.session_token = token;
            //sendToClient(token);
            res.status(201).json({ message: 'Authentication successful', token: token,redirectUrl: '/' })
            .cookie('session_token', token);
        } else {
            res.status(401).json({
                message: 'Incorrect password'
            });
        }
    }
    
});

app.delete('/session', (req, res) => {
    //delete token token in browser
});

app.post('/highscores/:id', (req, res) => {
    //send username + punkte
});

app.get('/highscores/:id', (req, res) => {
    //save
});
//POST route
/*
app.post('/login', (req, res)  => {
    const loginData =JSON.stringify(req.body);//data from form
    console.log(loginData);

    //login in db

    res.status(200).json({
        message: 'Hello Login from express.js'//selbstdefiniert
    }); //um json file an der Client zurück zu schicken
});
*/

//damit express.js alle angelegte routen als module exportiert, um in node.js server zu verwenden
module.exports = app;