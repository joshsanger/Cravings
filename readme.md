#Rebecca's Cravings
This project was created to allow my wife to let me know what she was craving throughout her pregnancy with our son, Linus. We eventually decided to just use Pinterest, but this was still a fun project!

[View demo](http://joshuasanger.ca/cravings) 


##Features
* Add URLs of recipes, restaurant menu items, take out, or pretty much aything on the internet
* Using the Embed composer library found [here](https://packagist.org/packages/embed/embed), I get the information from the page, and find the best image to set as the thumbnail image
* The craving is then saved to local storage for later viewing (back when it was just for my wife and I, a database was being used and and email notification would be sent to myself)
* Users can then remove cravings if they wish or go directly to the URL


## Languages / tools used
* JavaScript ES6
* Webpack
* Babel
* Grunt
* Jquery (mostly for easy DOM querying)
* LESS / CSS3
* HTML5
* PHP
* Composer
* NPM


## Running this project locally
There is a file needed in the `_inlcudes` folder that is not tracked called `config.php`. In order to run this locally, you will need to specify a `BASE_URL` with the project path inside this file.
 
Example: `define('BASE_URL', 'http://192.168.0.1/cravings');`

Once the configuration file is added, you will need to run `npm install`, `composer install`, `webpack && grunt`.



> See more of what I'm up to on my [personal portfolio](http://joshuasanger.ca/).