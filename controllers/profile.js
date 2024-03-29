const handleProfile = (req, res, db) => {
	const { id } = req.params;
	
	db.select('*').from('users')
	.where({id})
	.then(user => {
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('User does not exist');
		}
	})
	.catch(err => res.status(400).json('error getting user'))
	
	// res.status(404).json('No such profile');
}

module.exports = {
	handleProfile: handleProfile
};