const mongoose = require('mongoose')

const PlacesChached = new mongoose.Schema(
	{	
		name: {type: String, required: true},
		response: {}
        // each_trip = { [{location: String, endDate, startDate, routes}] }
	},
	{ collection: 'places-cached' }
)

const model = mongoose.model('Places-Chached', PlacesChached)
module.exports = model