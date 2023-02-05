const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

// Models
const Tought = require('./models/Tought');
const User = require('./models/User');


// Routes

const toughtsRoutes = require('./routes/toughtsRoutes');
const authRoutes = require('./routes/authRoutes');

// Controllers
const ToughtsController = require('./controllers/ToughtsController');

// ---------------- //

const app = express();
const conn = require('./db/conn');
 

// ---------------- //

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(express.static('public'));


// ------- MIDDLEWARES------ //

app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3600000000,
            expires: new Date(Date.now() + 3600000000),
            httpOnly: true
        }
    })
);


app.use(flash());

// Custom

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }

    next();
})



// ------Routes----- //


app.use('/toughts', toughtsRoutes); 
app.get('/', ToughtsController.showToughts);

app.use('/', authRoutes);



// ------------- //
conn
    .sync()
    // .sync({force:true})
    .then(() => app.listen(3000))
    .catch((e) => console.log(e))