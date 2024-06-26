const express = require('express');
const app = express(); //express server gestartet

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true 
  };
app.use(cors(corsOptions));//cross origin request zu ermöglichen


 
//um mit json files zu arbeiten
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = [
    {
        email: "test@test.at",
        password: "12345678",
        contacts: {
            company: "FH Technikum",
            address: "Musterstraße 1",
            city: "Vienna",
            postal_code: 1234
        },
        score: 101
    },
    {
        email: "test2@test.at",
        password: "mysecret",
        contacts: {
            company: "Tech Corp",
            address: "Techstraße 2",
            city: "Graz",
            postal_code: 2345
        },
        score: 205
    },
    {
        email: "test3@test.at",
        password: "letmein",
        contacts: {
            company: "Innovate GmbH",
            address: "Innovationstraße 3",
            city: "Linz",
            postal_code: 3456
        },
        score: 310
    },
    {
        email: "test4@test.at",
        password: "admin123",
        contacts: {
            company: "Dev Solutions",
            address: "Entwicklungsstraße 4",
            city: "Salzburg",
            postal_code: 4567
        },
        score: 150
    },
    {
        email: "test5@test.at",
        password: "password",
        contacts: {
            company: "Web Services",
            address: "Webstraße 5",
            city: "Innsbruck",
            postal_code: 5678
        },
        score: 190
    },
    {
        email: "test6@test.at",
        password: "123456",
        contacts: {
            company: "Net Solutions",
            address: "Netzstraße 6",
            city: "Vienna",
            postal_code: 6789
        },
        score: 220
    },
    {
        email: "test7@test.at",
        password: "qwerty",
        contacts: {
            company: "Software GmbH",
            address: "Softwarestraße 7",
            city: "Graz",
            postal_code: 7890
        },
        score: 170
    },
    {
        email: "test8@test.at",
        password: "football",
        contacts: {
            company: "IT Solutions",
            address: "ITstraße 8",
            city: "Linz",
            postal_code: 8901
        },
        score: 280
    },
    {
        email: "test9@test.at",
        password: "admin",
        contacts: {
            company: "Data Systems",
            address: "Datenstraße 9",
            city: "Salzburg",
            postal_code: 9012
        },
        score: 330
    },
    {
        email: "test10@test.at",
        password: "welcome",
        contacts: {
            company: "Analytics Corp",
            address: "Analyseweg 10",
            city: "Innsbruck",
            postal_code: 1234
        },
        score: 400
    }

];
const sessions = {
    //"test@test.at12345678_0.6940021015496056" : "test@test.at"
};

app.get('/', (req, res)  => {
    //console.log('headers', req.headers.cookie);
    const token = req.headers.cookie?.split('=')[1] || '';
    //console.log('token in get /', token);
    
    const user = sessions[token];
    console.log(sessions);
    if (!user){
        return res.status(401).send({message: 'Yor are not logged in'});
    }
    return res.status(200).send({
        message: 'Welcome ' + user.email,
        scores: user['scores']
    });
});

function isUserRegistred(email) {
    //find email in database return user object
    //return email === "test@test.at";
    const user = db.find((user) => user.email === email);
    return !!user;
}

//TODO: rename to verify user
function checkPasswordForThisEmail(password, email) {
    const user = db.find((user) => user.email === email);
    if (!user) {
        return false;
    }
    return user.password === password; //in real hash 
    
}
function generateToken(email, password) {
    return email + password + '_' + Math.random();// in real anders
}
app.post('/sessions', (req, res) => {
    const {email, password} = req.body;
    console.log(sessions);
    if (!email || !password) { //validation 
        return res.status(400).send({message: 'E-mail und Passwort sind erforderlich'});
    }
    if (!isUserRegistred(email)) {//validate
        return res.status(401).json({
            message: 'No user with this email exists'
         });
    }
    if(!checkPasswordForThisEmail(password, email)) {
        return res.status(401).json({
            message: 'Incorrect password'
        });
    }
        //aufgabe 1.3
        const sessionToken = generateToken(email, password);
        //lege ein neuen Session Token
        sessions[sessionToken] = {'email': email}; //passord not in session!
        
        //send to Client als header
        res.set('Set-Cookie', `session=${sessionToken}; HttpOnly; SameSite=Lax`); //request bei allen endpoint wurde cookies hinzugefuegt
        //end aufgabe 1.3
        return res.status(200).send({message: `Logged in as ${email}`, token: sessionToken});
    }
);

app.delete('/sessions', (req, res) => {
    //get token
    const token = req.headers.cookie?.split('=')[1];
    if (!token) {
        return res.status(400).send({ message: 'Token not found' });
    }
    //delete token token in session
    delete  sessions[token];
    console.log(sessions);
    //delete token token in browser
    
    res.set('Set-Cookie', `session=; HttpOnly; SameSite=Lax`);
    return res.status(204).send({message: 'Logged out'});
});

/*
stub function for password hashing
*/
function hash(password) {
    return password;
}
function saveUserToDatabase(user) {
    db.push(user);
    console.log('database updated', db);
}

// u1. 1 
app.post('/users', (req, res) => {
    try {
        // Extrahiert die Benutzerdaten aus der Anfrage
        const userData = req.body;
        console.log('Route bekomt alle Informationen des SignUp Formular', userData);
        const {email, password, ...contactInformation} = userData;
        const hashedPassword = hash(password);
        const user = {'email': email, 'password': hashedPassword, ...contactInformation};
        //Übung 1.2 
        if (isUserRegistred(email)){
            //return res.status(409).({message: `User with ${email} already exists`});
            return res.status(409).json({message: `User with ${email} already exists`});
        }
        saveUserToDatabase(user);
        const sessionToken = generateToken(email, password);
        sessions[sessionToken] = {'email': email};
        //Setzt das Sitzungstoken als HttpOnly-Cookie
        res.set('Set-Cookie', `session=${sessionToken}; HttpOnly; SameSite=Lax`);
        res.status(201).json({message: `User ${email} created successfully`, token: sessionToken});
    }catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function isloggedIn(req, res, next) {
    const token = req.headers.cookie?.split('=')[1];
    if (!token) {
        return res.status(401).send({ message: '  Not logged in' });
    }
    //ob session mit token existiert
    const session = sessions[token];
    if (!session) {
        return res.status(401).send({ message: 'Not logged in' });
    }
    const user = db.find((user) => user.email === session.email);
    console.log('user', user);
    if (!user) {
        return res.status(401).send({ message: 'User does not exist' });
    }
    req.user = user;
    next();
}
// Aufgabe 2.1
//eine middleware funtion reinhang
app.post('/highscores', isloggedIn, (req, res) => {
    const user = req.user;
    //get scores
    const scores = req.body.scores;

    //update scores in db
    user['score'] = scores;

    return res.status(200).send({ message: 'Scores saved' });
});

function getHighscores() {
    return db.map((user) => {
        return {email: user.email, score: user.score};
    })
}

app.get('/highscores', isloggedIn, (req, res) => {
    const userEmailAndScoresList = getHighscores();
    return res.status(200).send({ highscoreList: userEmailAndScoresList });
});
//damit express.js alle angelegte routen als module exportiert, um in node.js server zu verwenden
module.exports = app;