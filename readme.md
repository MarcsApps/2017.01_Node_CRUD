# RESTful API Mongo, Node, Express, Jade, Monk...
## Start Of RESTFUL API version is at end, scroll down.

#### Steps Taken in Project, from Scratch to create and mod a default express-generator project.
#### Created 1/2017 but based on 2015updated2013 tutorial so uses some older versions. 

#### Shortcuts for finished: RUN THESE TWO LINES THEN GO TO WEB ADDR>
#### Run mongo from .... run npm start in nodetest1
// added below to npm start, so it runs both mongo and express server concurrently in own cmd windows
(in windows at least)

//  (set in package.json start)

//FIXME:  Start script in npm start may not work on non-windows/production...not sure testuser2

        cd C:\Program Files\MongoDB\Server\3.4\bin 
        mongod --dbpath C:\Users\marca\Documents\www\2017.01_Node_CRUD\nodetest1\data
        npm start
        
## Based first on Christopher Buecheler's tutorial 
#### here: http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

Uses express generator (npm install -g express-generator) to install a skeleton of:

+ express
+ Jade (soon pug) templating engine uses strict whitespace
+ MongoDB
+ Monk (simipler/smaller layer than mongoose js = similar purpose, easier connections, less code vs vanilla mongo )

*(files added manaully to package.json before nmp install.)*

 -------------------------------------------------------------------------------------------------------
# Steps: 
 -------------------------------------------------------------------------------------------------------
## Pre-requisites
0. Pre-requisites: 

        install node.js & npm.
        install express 
        install express-generator npm install -g
### Generate App Scaffold, Test. [Node, Express, Jade, Mongo, Monk...]
1\. Generate Project: express nodetest1  (use any name for the project / folderName)
2\. Edit package.json, add lines for mogo and monk:

        "mongodb": "^1.4.4",
        "monk": "^1.0.1"

3\.      cd nodetest1
        npm install 
    (all the dependencies in package.json are installed)

4\.      mkdir data

5\.      npm start  
    (This should start listening at //localhost:3000 as set in /bin/www (i think!))

6\. Some simple hello world nonsense.
   Copy the routes/index.js Get route for '/' and change to /helloworld
   
            ###    /* GET hello World page. */                             
            router.get('/helloworld', function(req, res, next) {
            res.render('helloworld', { title: 'Hello, World!' });
            });
    Added View helloworld.jade to /views (cloned index.jade, text hello world edit.)

## Setting Up / Running Mongod and Mongo

7\.      mkdir data

8\.      Run Mongod 

Start server:
      ```C:\Program Files\MongoDB\Server\3.4\bin```
  
 (or wherever MongoDB is installed in windows.)
```mongod --dbpath C:\Users\marca\Documents\www\2017.01_Node_CRUD\nodetest1\data```

[Will see intial setup if first run.] 

[initandlisten] waiting for connections on port 27017  
<---- Success if this is last line in console. (Server is running.)

9\. ```Run mongo``` (start mongo shell) [Note not really needed website, for tutorial/learning.]
    In new CMD Consold - cd to mongo installation /bin:
    ```mongo``` 
## Create DB (type into mongo shell)

10\. ```use nodetest1```  //create db 

11\. Enter this in to the db:

        db.usercollection.insert({ JSON KEY:VALUES for db row/document) })  //enter data
        db.usercollection.insert({ "Med" : "Tramadol", "Date" : "01/14/2017", "Time" : "01:33AM"})
        db.usercollection.insert({ "Med" : "Gabapentin", "Date" : "01/14/2017", "Time" : "01:33AM"})
        db.usercollection.insert({ "Med" : "Robenacoxib", "Date" : "01/14/2017", "Time" : "01:34AM"})
        db.usercollection.insert({ "Med" : "Meloxicam", "Date" : "01/14/2017", "Time" : "01:34AM"})


or combine ; or use somehting like this:

        newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" },
                     { "username" : "testuser3", "email" : "testuser3@testdomain.com" }]
        db.usercollection.insert(newstuff);
    

## [I'm breaking from the username/email from the tutorial here.]
12\. List collection data in console:

        db.usercollection.find().pretty() //.pretty() method gives us linebreaks

##  HOOK MONGO UP TO NODE
13\. Add connection info to app.js:

        // New Code   
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('localhost:27017/nodetest1');
        
14\. Add db to router (insert above the '/' route lines as shown below:)

[adds db to the route, and thus every HTTP req. Is not best, but quick / dirty method!]
    
        // Make our db accessible to our router
        app.use(function(req,res,next){
            req.db = db;
            next();
        });
            
        app.use('/', index);  //Must be inserted before this

### Display Data 
15\. Add new route to index.js ; specifies url for collection, and db.get of collection, req.
   
        /* GET medlog page. */
        router.get('/medlog', function(req, res) {
            var db = req.db;
            var collection = db.get('medlogcollection');
            collection.find({},{},function(e,docs){
                res.render('medlog', {
                    "medlog" : docs
                });
            });
        });

16\. Add new view / jade template for medlog.

 Duplicate index.jade as medlog.jade, edit to add jade db fields #{log.Med} etc in a loop (see file.)

17\. Stop server. CNTL-C cmd window, npm start.

If see error cannot find module ..../Relase/bson] .... and later js-bson: Failed to load C++ 
(follow Buecheler's tutorial instrustions at bottom.)

18\. goto: ```localhost:3000/medlog```
## Setup Post
19\. Create Data Input... /routes/index.js  add a router get for addmed

        /* GET Add (New) med page. */
        router.get('/addmed', function(req, res) {
            res.render('addmed', { title: 'Add med' });
        }); 

20\. Create Jade Template in views/addmed.jade

21\. Add new route to index.js for the Add to DB fucntion, recieve POST / addmed

This is detailed to see doc at /* POST TO ADD NEW MED SERVICE */

22\. Stop/Restart npm start

---The end of his tutorial.




# -------------------THE END---------------------- 
Just notes and todo's below
# -------------------THE END---------------------- 

## nodemon ...auto restart after edits to .js files of node... (err npm start)

npm install -g nodemon

Edited package.json: node ==> nodemon

    "start": "node ./bin/www"

    also added:

    "prestart": "start mongod --dbpath C:\\Users\\marca\\Documents\\www\\2017.01_Node_CRUD\\nodetest1\\data",

## WILL WANT TO REMOVE THIS FROM PRODUCTION I GUESS! 
TODO:


#TODO:
# Change to mdbLab Online?
just note change app.js instead of localhost use var db = monk('127.0.0.1:27017/nodetest1'); 

change to actual url... and search any other ref localhost



# Data for medlogcollection
i removed data from collection and added (fixed) it again with: 

    db.medlogcollection.remove({})
    
```
        newstuff = [{
        "Med" : "Tramadol",
        "Date" : "01/14/2017",
        "Time" : "02:17AM"
        },
{
        "Med" : "Gabapentin",
        "Date" : "01/14/2017",
        "Time" : "02:17AM"
},
{
        "Med" : "Robenacoxib",
        "Date" : "01/14/2017",
        "Time" : "02:17AM"
},
{
        "Med" : "Meloxicam",
        "Date" : "01/14/2017",
        "Time" : "02:17AM"
}]
```


        db.medlogcollection.insert(newstuff);
        db.medlogcollection.find().pretty()


# Fix for BSON module not found, ...
Getting the following error?
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' } js-bson: Failed to load c++ bson extension, using pure JS version

First off, don't worry! You can still run your node application even when seeing this error. Basically, what's happening is: during the initial "npm install" process, the MongoDB module tried to create a couple of files using Python v2.7. If you don't happen to have that installed (even if you have a higher version of Python, it won't work), then it can't build the files, so it falls back on a JavaScript-driven system instead. This system works just fine, but in a production environment with a lot of data handling, it can be slow, so it's better to have the binaries.

If you want to get rid of the error, follow these steps:

Install Python 2.7 (this will not impact existing Python 3.x installs).
Delete your node_modules directory and everything in it.
Re-run npm install in your nodetest1 directory from the command line.


(I didn't install pytho, just changed ../build/release/bson to /bson in the nmp modules:  nodetest1/node_modules/bson/ext/index.js) 


---
RESTful fork
Project changed to work from RESTful api, instead of exclusively through HTML templating, injecting the
database data with JADE.
Steps Below:

---

