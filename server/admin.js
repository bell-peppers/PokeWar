const admin = require('firebase-admin');

function getOtherUser(uid) {
	admin
		.auth()
		.getUser(uid)
		.then((userRecord) => {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
		})
		.catch((error) => {
			console.log('Error fetching user data:', error);
		});
}

module.exports = {getOtherUser}
