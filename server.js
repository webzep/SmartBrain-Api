const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date(),
		},
	]
}

// GET ROOT
app.get('/', (req,res) => {
	res.send(database.users);
})

// POST SIGNIN
app.post('/signin', (req,res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else{
		res.status(400).json('failed');
	}
})

//POST REGISTER
app.post('/register', (req,res) => {
	const {email, name, password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),
	})
	res.json(database.users[database.users.length-1]);
})

// GET PROFILE:userid
app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	
	database.users.forEach(user => {
		if (user.id === id) {
			return res.json(user);
		}
	})
	res.status(404).json('No such profile');
})

// PUT IMAGE
app.put('/image', (req, res) => {
	const { id } = req.body;
	
	database.users.forEach(user => {
		if (user.id === id) {
			user.entries++;
			return res.json(user.entries);
		}
	})
})

app.listen(3001, ()=> {
	console.log('app is running on port 3001');
})