var http = require('http'),
    fs = require('fs'),
    url = require('url');

var choices = [
    "No pressure, no diamonds",
    "Be yourself, everyone else is already taken",
    "So many books, so little time",
    "Aspire to inspire before we expire",
    "Stay foolish to stay sane",
    "When nothing goes right, go left",
    "Try Again. Fail again. Fail better.",
    "Don't tell people your plans. Show them your results"
];

http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    if(path=="/getstring"){
        console.log("request recieved");
        var string = choices[Math.floor(Math.random()*choices.length)];
        console.log("string " + string + " chosen");
        response.writeHead(200, {"Content-Type": "text/plain"});
        console.log("string sent");
        response.end(string);
    } else {
        fs.readFile('./index.html', function(err, file){
            if(err){
                return;
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(file, "utf-8");
        });
    }
}).listen(8001);

console.log("server initialized");