var r = require("request");
var http = require('http');
var resString ='';
var resObject;

http.request('http://irish-elections.storyful.com/candidates.json', 
    function(res){
        res.on('data', function(data){
            resString += data;
        });
        res.on('end', function(){
            resObject = JSON.parse(resString.replace(/\"\"/g, 'null'));
            // resObject = JSON.parse(resString);
            neoCreate(resObject);
        });
    }
).end();
    
function cypher(url, query,params,cb) {
    r.post({uri:url,
        json:{statements:[{statement:query,parameters:params}]}},
        function(err,res) { cb(err,res.body)})
}

function neoCreate(election){
    console.log(election);
    console.log(election.candidates[0]);
    var dbEndPoint = "localhost:7474/db/data/transaction/commit";
    var username = 'neo4j', password = '12345Jm';
    var url = 'http://' + username + ':' + password + '@' + dbEndPoint;
    var query="MATCH (n:User) RETURN n, labels(n) as l LIMIT {limit}"
    var params = {limit: 10}
    var cb = function(err,data) { console.log(JSON.stringify(data)); }

    cypher(url, query,params,cb);
};



