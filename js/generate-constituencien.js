var r = require("request");
var http = require('http');
var resString ='';
var resObject;
var dbEndPoint = "localhost:7474/db/data/transaction/commit";
var username = 'neo4j', password = '12345Jm';
var url = 'http://' + username + ':' + password + '@' + dbEndPoint;
var params = {limit: 10}
var cb = function(err,data) { console.log(JSON.stringify(data)); }
    
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
    
function cypher(url,query,params,cb) {
    r.post({uri:url,
         json:{statements:[{statement:query}]}},
        function(err,res) { cb(err,res.body)})
}

function neoCreate(election){
    // console.log(election);
    console.log(election.candidates[0]);

    
    var statements = [];

    for(var i = 0; i < election.candidates.length; i++){
        queryBuilder(election.candidates[i]);
    }
    
};

function queryBuilder(candidate){
    var query= "CREATE (n:Candidate { first_name : '" +candidate.first_name+ "', last_name : '" +candidate.last_name+ "', gender : '" +candidate.gender+ "'";
    
    if(candidate.website_url !== null){
        query += ", website : '" +candidate.website_url+ "'"; 
    }
    
    query += "}) RETURN n";
    cypher(url, query ,params,cb);
    
    if(candidate.twitter_url !== null){
        var queryTwitter = "CREATE (n:Twitter { url : '" +candidate.twitter_url+"'}) RETURN n";
        var cbTwitter = function(err,data) { 
            console.log(JSON.stringify(data)); 
            var relTwitter = "MATCH (candidate:Candidate { first_name : '" +candidate.first_name+ "', last_name : '" +candidate.last_name+ "'}), (twitter:Twitter{url : '" +candidate.twitter_url+"'}) MERGE (candidate)-[r:IS_ON]->(twitter)";
            cypher(url, relTwitter ,params,cb);
        }

        cypher(url, queryTwitter ,params,cbTwitter);
               
    }
  
}

