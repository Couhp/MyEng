const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useMongoClient: true })
.then(() => {
	console.log('[i] Connected successfully to mongodb');
})
.catch(err => {
	console.error(err);
});

module.exports = mongoose;
