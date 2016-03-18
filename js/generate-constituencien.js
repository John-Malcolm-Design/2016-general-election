var request = require("request")
var http = require('http');
var resString ='';
var resObject;
var dbEndPoint = "localhost:7474/db/data/transaction/commit";
var username = 'neo4j', password = '12345Jm';
var url = 'http://' + username + ':' + password + '@' + dbEndPoint;
var params = {limit: 10}

var cb = function(err,data) { 
    if (data.errors.length > 0){
        console.log(JSON.stringify(data)); 
    }
}

var urlAPI = "http://irish-elections.storyful.com/candidates.json";

request({
    url: urlAPI,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        neoCreate(body) 
    }
})
    
function cypher(url,query,params,cb) {
    request.post({uri:url,
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
    var firstName = candidate.first_name.replace("'", "");;
    var lastName = candidate.last_name.replace("'", "");;
    var query= "CREATE (n:Candidate { first_name : '" +firstName+ "', last_name : '" +lastName+ "'";
     
    if(candidate.gender !== null){
        query += ", gender : '" +candidate.gender+ "'"; 
    }
    
    if(candidate.photo_url !== null){
        query += ", photo_url : '" +candidate.photo_url+ "'"; 
    }
    
    if(candidate.website_url !== null){
        query += ", website : '" +candidate.website_url+ "'"; 
    }
    
    query += "})";
    cypher(url, query ,params,cb);
    
    if(candidate.twitter_url !== null){
        var queryTwitter = "CREATE (n:Twitter { url : '" +candidate.twitter_url+"'})";
        var cbTwitter = function(err,data) { 
            if (data.errors.length > 0){
                console.log(JSON.stringify(data)); 
            }
            var relTwitter = "MATCH (candidate:Candidate { first_name : '" +firstName+ "', last_name : '" +lastName+ "'}), (twitter:Twitter{url : '" +candidate.twitter_url+"'}) MERGE (candidate)-[r:IS_ON]->(twitter)";
            cypher(url, relTwitter ,params,cb);
        }

        cypher(url, queryTwitter ,params, cbTwitter);
               
    }
  
}

