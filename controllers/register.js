const handleRegister = (req,res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if (!name || !email || !password) {
		return res.status(400).json('Incorrect form submission');
	}
	
	const hash = bcrypt.hashSync(password);

	// If one fails all fail
	db.transaction(trx => {

		// add to login table
		trx.insert({
		hash: hash,
		email: email,
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {

			//_________ Take email and use to add to users
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date(),
			})
			.then(user => {
				res.json(user[0]);
			})
			
			//________
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Could not register'));
}

module.exports = {
	handleRegister: handleRegister
};