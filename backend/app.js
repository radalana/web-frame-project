const express = require('express');
const app = express(); //express server gestartet

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200', // Адрес вашего Angular приложения
    credentials: true // Разрешает отправку и получение куки
  };
  app.use(cors(corsOptions));//cross origin request zu ermöglichen


 
//um mit json files zu arbeiten
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const sessions = {
    //"test@test.at12345678_0.6940021015496056" : "test@test.at"
};

app.get('/', (req, res)  => {
    console.log('headers', req.headers.cookie);
    const token = req.headers.cookie?.split('=')[1] || '';
    console.log('token in get /', token);
    
    const user = sessions[token];
    console.log('email', user.email);
    if (!user){
        return res.status(401).send({message: 'Yor are not logged in'});
    }
    return res.status(200).send({
        message: 'Welcome ' + user.email
    });
});

function isUserRegistred(email) {
    //find email in database return user object
    return email === "test@test.at";
}

//TODO: rename to verify user
function checkPasswordForThisEmail(password, email) {
    //only now befor database
    return email=== "test@test.at" && password === "12345678";
}
function generateToken(email, password) {
    return email + password + '_' + Math.random();
}
app.post('/sessions', (req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) { //validation 
        return res.status(400).send({Token: 'E-mail und Passwort sind erforderlich'});
    }
    if (!isUserRegistred(email)) {//validate
        res.status(401).json({
            message: 'No user with this email exists'
         });
    }
    if(!checkPasswordForThisEmail(password, email)) {
        res.status(401).json({
            message: 'Incorrect password'
        });
    }
        const sessionToken = generateToken(email, password);
        //lege ein neuen Session Token
        sessions[sessionToken] = {'email': email}; //passord not in session!
        
        //send to Client als header
        res.set('Set-Cookie', `session=${sessionToken}; HttpOnly; SameSite=Lax`); //request bei allen endpoint wurde cookies hinzugefuegt
        
        return res.send({Token: sessionToken});
    }
);

app.delete('/sessions', (req, res) => {
    //get token
    const token = req.headers.cookie?.split('=')[1]; //dвынести в отдельную функцию
    if (!token) {
        return res.status(400).send({ message: 'Token not found' });
    }
    //delete token token in session
    delete  sessions[token];
    //delete token token in browser
    res.set('Set-Cookie', `session=; HttpOnly; SameSite=Lax`);
    return res.send({message: 'Logged out'});
});


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