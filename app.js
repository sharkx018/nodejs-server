const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var port = process.env.PORT || 3000;
var app = express();

// handlebar (hbs)=------------
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getDate', ()=>{
	return new Date().getFullYear();
	
})

hbs.registerHelper('scremIt', (text)=>{
	return text.toUpperCase();
});

// handlebar middleware (app.use)

app.use((req, res, next)=>{

	var now = new Date().toString();
	var log = now +' '+req.method +' '+req.url +'\n';
	console.log(log);
	fs.appendFile('server.log', log, (error)=>{
		if(error){
			console.log('Error in appending the file');
		}
	});
	next();

});






// app.use((req, res, next)=>{
// 	res.render('maintain.hbs');
// });


app.use(express.static(__dirname+'/public'));

// hbs---------------------- 





app.get('/', (req, res)=>{

	res.render('home.hbs',{
		tit:'Welcome to the Home Page',
		mess:'Home Page',
		desc:'You opened the home page'
	});


});

app.get('/portfolio', (req, res)=>{

	res.render('project.hbs',{
		tit:'Welcome to the Portfolio Page',
		mess:'Project Page',
		desc:'You opened the Portfolio page'
	});


});

//app.



app.get('/about', (req, res)=>{

	res.render('about.hbs', {
		tit:'Welcome to the About Page',
		mess:'About Page',
		desc:'You opened the about page'
	});

});

app.listen(port,()=>{
	console.log('Runnung on '+port );
});