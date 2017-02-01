/*Define dependencies.*/

var express = require('express');
//var fs = require('fs');
var app = express();
//var path = require('path');
//var port = process.env.PORT

/*Public directory*/
app.use(express.static(__dirname));
app.use('/appairage', express.static('select_driver'));
app.use('/admin', express.static('administration'));
app.use('/web', express.static('renseigner_plateforme'));

app.get('/', function(req, res){
	res.send('/index.html')
});

app.get('/web/index.html', function (req, res){
	res.send('/web/index.html')
});

app.get('/appairage/index.html', function (req, res){
	res.send('/appairage/index.html')
});

// Run the server.
app.listen(3000);
/*
app.listen(port, function () {
    console.log("Port : "+port);
});*/
