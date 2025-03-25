const placeholdersets= require('./placeholdersets.json');
const placeholderscoredata = require('./placeholderscoredata.json');
const app = require('./service');


const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, function() {
	console.log(`listening on port ${port}`);
});