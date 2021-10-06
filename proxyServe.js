const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3001; 
const axios = require('axios'); 
app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/search', (req,res) => {
	console.log(req.body, req.body.query)
	axios.get('https://openapi.naver.com/v1/search/movie.json',{
		params: {query: req.body.query},
		headers: {
			'X-Naver-Client-Id': 'QA8UjSKONNKwkAUuOXtp',
			'X-Naver-Client-Secret': 'U5i5lbTaxm',
			'Access-Control-Allow-Origin': '*'
		}
	}).then(function(response) {
		const items = response.data.items; res.send({
			items:items
		});
	}).catch(function(error) {
		console.log(error);
	});
}); 
app.listen(port,() => {console.log(`express is running on `)});