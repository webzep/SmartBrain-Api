const express = require('express');
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcryptjs')

const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		// host: 'postgresql-cylindrical-89687',
		// user: 'postgres',
		// password: 'test',
		// database: 'smartbrain',
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	}
});

const app = express();
app.use(express.json());
app.use(cors());

// END POINTS
// GET ROOT
app.get('/', (req,res) => {	res.send('It is working!') })

// POST SIGNIN
app.post('/signin', signIn.handleSignIn(db, bcrypt))

//POST REGISTER
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// GET PROFILE:userid
app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})

// PUT IMAGE
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

// GET IMAGEURL
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, () => { console.log(`app is running on port ${process.env.PORT}`)})