# ITP Project
# Vehicle-service-and-agro-machinery-managment-system
## _Group TW10_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

MERN is one of several variations of the MEAN stack (MongoDB Express Angular Node), where the traditional Angular.js front-end framework is replaced with React.js. Other variants include MEVN (MongoDB, Express, Vue, Node), and really any front-end JavaScript framework can work.

### This MERN Project based on Vehicle-service-and-agro-machinery-managment-system Functions...


✨Vehicle service booking management (Janindu)

✨User/admin account management (Pawan)

✨Staff  management (Nisal)
   -Employment options (uploading applications,details)
   -Meet the team
   
✨Product management (Pehesarani)
   -Refinishing products
   -Agro products
   -cart

✨Customer service and promotions management (Sithija)
   -Contact us
   -About us and FAQ
   -Ratings and reviews
   -Promotions sections (promotions / discounts for agro machinery or spare parts) 

✨Issue management  (Piyumi)
   -General issues 
   -Emergency issues (Includes 24h service for vehicle repairing,towing etc)

✨Progress tracking system(Nethum)
   -Vehicle service progress tracking option for customers 
   -Past/Future service records

✨Vehicle damage valuation (Tharusha)
   -Keeping track of the status of the vehicle before repairing/painting
   




## Developing Team
   1. IT21259470 
   Pehesarani W.K.A
   0760589370

   2. IT21259302
   Narasinghe N.M.N.N
   0776223206

   3. IT21259098
   Dilshan K.H.T
   0702793307

   4. IT21263262
   Abeykoon A.M.P.N
   0760598525

   5. IT21257568
   Panangala P.A.D.S.S
   0770618812

   6. IT21264016
   Helapalla K.O.P.S
   0775520022

   7. IT21310478
   Saranasuriya N.V
   0765944049
   
   8. IT21258626
   Munasinghe J.R 
   0768472460
   
   
   
   ## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!



## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| VsCode | [plugins/vscode-tips-and-tricks/blob/master/README.md][PlVc]|
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| Postman |[plugins/postman-app-support/blob/support/README.md][PlPm] |











   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
   [PlVc]: <https://github.com/Microsoft/vscode-tips-and-tricks/blob/master/README.md>
   [PlPm]: <https://github.com/postmanlabs/postman-app-support/blob/support/README.md>
   
   


#### _**IMPORTANT NOTE**_ - 


## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm start`

Runs just the client app in development mode.<br>
Open [http://localhost:4000](http://localhost:4000) to view the client in the browser.


### `npm run dev`

Runs just the server in development mode.<br>



### dependencies
-server
npm i express nodemon dotenv mongoose

-client
npm i react-router-dom
npm i date-fns


### Nisal
1.Career section Admin section CRUD
    insert : POST :localhost:4000/api/vacancies/
    selectAll : GET : localhost:4000/api/vacancies/
    selectOne : GET : localhost:4000/api/vacancies/:id
    update : PATCH : localhost:4000/api/vacancies/:id
    delete : DELETE : localhost:4000/api/vacancies/:id