var express = require('express');
var PythonShell = require('python-shell');
var fs = require('fs');
var _ = require('lodash');

var app     = express();

var errors = {
	"NO_PRICE" : {"Error": "No Prices Available"},
	"NO_CITY":  {"Error": "No City Found!"}
}

app.get('/', function(req,res) {
	var commands = {
		"/scrape" : "Will Scrape the prices",
		"/prices" : "Will Return the Scraped Prices",
		"/city/:city": "Will return price for city"
	}
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(commands, null, 4))
})
app.get('/scrape', function(req, res){
	PythonShell.run('python/scrapper.py', function (err, result) {
	  if (err) throw err;
	  console.log(result)
	  res.send('Scraping Successfull')
	});
})

app.get('/prices', function(req, res) {
	var obj;
	fs.readFile(process.cwd() + '/prices.json', 'utf8', function (err, data) {
	  	  res.setHeader('Content-Type', 'application/json');
 	 	  if (err) {
 	 	  	
 	 	  	res.send(errors.NO_PRICE);
 	 	  } else {
 	 	  	res.setHeader('Content-Type', 'application/json');
		  	res.send(JSON.stringify(JSON.parse(data), null , 4));
 	 	  }

	});
})

app.get('/city/:city', function(req, res) {
	fs.readFile(process.cwd() + '/prices.json', 'utf8', function (err, data) {
	  	  res.setHeader('Content-Type', 'application/json');

	  	  var city = req.params.city;
	  	  if(city.split('_').length == 1) {
	  	  	city = city[0].charAt(0).toUpperCase()+req.params.city.slice(1).toLowerCase();
	  	  }

 	 	  if (err) {
 	 	  	res.send(errors.NO_PRICE);
 	 	  } else {
 	 	  	var json = JSON.parse(data).stores;
 	 	  	if(json[city]) {
 	 	  		res.send(JSON.stringify(json[city], null, 4) )
 	 	  	} else {
 	 	  		res.send(errors.NO_CITY)
 	 	  	}
 	 	  }

	});
})

app.use(function (req, res) {
    res.redirect('/');
	
});

app.timeout = 0;
app.listen('5000')
console.log('Magic happens on port 5000');
exports = module.exports = app;