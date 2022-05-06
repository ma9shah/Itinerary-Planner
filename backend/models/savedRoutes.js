const mongoose = require('mongoose')

const Routes = new mongoose.Schema(
	{	
		email: {type: String, required: true},
		trips: {type: Array}
        // each_trip = { [{location: String, endDate, startDate, routes}] }
	},
	{ collection: 'saved-routes' }
)

const model = mongoose.model('Saved-Routes', Routes)
module.exports = model