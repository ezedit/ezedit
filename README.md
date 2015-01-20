# EZEDIT
The fast and easy way to give your clients control of their online presence.

## About
EZEDIT is a Platform as a Service (PAAS) for web designers to give their clients full control of the digital content on their website. Using EZEDIT is as simple as including the generated script tag in the site HTML, and your client can update their site in realtime.

This is an opensource project under the MIT license, and utilizes a MENB stack:
 - [mongoDB](http://www.mongodb.org/)
 - [Express](http://expressjs.com/)
 - [node.js](http://nodejs.org/)
 - [backbone.js](http://backbonejs.org/)

along with:
 - [Twiter Bootstrap](http://startbootstrap.com/)
 - [jQuery](http://jquery.com/)
 - [underscore.js](http://underscorejs.org/)
 - [heroku](https://www.heroku.com/)

## Building
### Prerequisites
 - [node.js](http://nodejs.org/)
 - A running instance of [mongoDB](http://www.mongodb.org/)

### Build process
 1. Clone: `git clone git@github.com:ezedit/ezedit.git`
 2. Build: `cd ezedit; npm install`
 3. Configure: Create a file named `config.json` in the following format:
```
{
    "db_user": "user",
    "db_pass": "password",
    "db_uri": "localhost:27017"
}
```
 4. Run: `node bin/www`
 5. Enjoy: Visit `localhost:3000` in your web browser of choice

## Disclaimer
The entirety of this project was built in under 24 hours with the primary goal of being demoable. This is a **prototype** and in no way shape or form is it suitable to be used in a production environment.

## Credits
EZEDIT was created in a 24 hour hackathon, [Hack_UTD](http://hackutd.co/), by:
 - [Rahat Ahmed](https://github.com/rahatarmanahmed)
 - [Jonathan Darling](https://github.com/jmdarling)
 - [Zack Urben](https://github.com/zackurben)
