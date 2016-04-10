![alt text][logo]
[logo]: http://www.irishtimes.com/polopoly_fs/1.2550281.1456513107!/image/image.png_gen/derivatives/box_300/image.png "Credit Irish Times"

# Irish Election 2016 Neo4j Graph DB 
###### John Malcolm Anderson, G00290919

## Introduction
This project is about representing the constituencies, parties, social media and other info of the 2016 Irish election candidates. 

Node.JS was used to call public API's and also scrap the web to build a high speed graph databse in Neo4J so that we can make interesting queries and get usefull insights into key trends and influencers in the 2016 election.

## Database 
## Database Information
####Node labels 
![alt text][labels]
[labels]: http://www.johnmalcolmdesign.com/labels.png "Labels"

####Relationship types
- **FRIENDS:** Between TwitterLeaf(friend) and Twitter node for a specifiec candidate. 
- **IS_ON:** Between candidate and social media account nodes for that specific candidate. 
- **IS_RUNNING_IN:** Between candidate and constituency.

####Property keys
- **Candidate:** id, first_name, last_name, gender, party_profile_url, phone, photo_url, website, constituency
- **Contituency:** Name, area 
- **TwitterLeaf**: followed_by, handle, twitter_id
- **Twitter**: twitter_id, url
- **Facebook:** url
- **LinkedIn:** url

### Files
- **election.grass:** Stylesheet for Neo4J
- **js/candidates.js:** Buildes Candidates, constiuencies and social media nodes; and also also buildes relationship between them. Commented out code was also used to scrap twitter for data using a bash cron job. (Now moved to a different file for clarity)
- **js/createTwitterLeafs.js:** Used to build the Twitter Leaf nodes from the twitter data files. 
- **js/mergeDuplicateNodes.js:** Used to try and merge duplicate nodes (not yet working correctly).
- **js/package.json:** NPM file for downloading and managing project dependencies. 
- **js/social.js:** Simple twitter api caller to check my rate limit status - used for cron job.
- **js/rate-limit.json**: Result from social.js rate-limit checker.
- **js/twitcount.js**: Simple counter used by cron job for scraping the twitter API.
- **js/data:**: Data results of twitter api scraper seperated into 17 sub folders. 

### Building the database


## Issues
- **Twitter rate limit**
- **Data Cleansing**
- **Neo4J HTTP REST Api**
- **Node.JS internal memory**


## Queries
Summarise your three queries here.
Then explain them one by one in the following sections.

#### Query one title
This query retreives the Bacon number of an actor...
```cypher
MATCH
	(Bacon)
RETURN
	Bacon;
```

#### Query two title
This query retreives the Bacon number of an actor...
```cypher
MATCH
	(Bacon)
RETURN
	Bacon;
```

#### Query three title
This query retreives the Bacon number of an actor...
```cypher
MATCH
	(Bacon)
RETURN
	Bacon;
```

## References
1. [Neo4J website](http://neo4j.com/), the website of the Neo4j database.
