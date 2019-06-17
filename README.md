# DBCL-Navbar

A userscript to inject a menu into my self hosted services.

I made this little script because I do not like muximux, organizr & co.

The menu has 3 positions

<img src="https://db-cl.github.io/navbar/screen1.png" width="280"> <img src="https://db-cl.github.io/navbar/screen2.png" width="280"> <img src="https://db-cl.github.io/navbar/screen3.png" width="280">

You just have to create a JSON configuration file and install the script with tampermonkey. It will parse the JSON file and inject a menu in every page you want to. 

## How to use

This script has been tested with tampermonkey only, it may not work with greasemonkey

 1. Install tampermonkey
 2. Create a JSON file and host it properly. You must have and URL to grab the file from your browser, with CORS enabled
 3. Click on this link to install the userscript https://github.com/DB-CL/navbar/releases/latest/download/dbcl-navbar.user.js
 4. At the first run, the script will ask you for the URL pointing toward your JSON configuration file you made in step 2
 5. Go to the Tampermonkey dashboard panel and modify DBCL Navbar->Settings->Includes/Excludes->User matches according to your needs. For example you can add : *.example.com/* to match every subdomain of example.com
 6. Go to your matching URL. Tampermonkey will ask you an authorization to execute a XMLHttpRequest to grab your conf file. Accept it and the script should run.
 
## JSON configuration

Think twice before making this configuration publicly accessible !! (see the security chapter)

To work, the script must have an access to a configuration file like this one :

 ```
 {
    "width": 220,
    "iconSize": 32,
    "title": "DBCL Links",
    "apps": [
        {
            "name": "AirSonic",
            "icon": "airsonic",
            "url": "https://www.example.com/music"
        },
        {
            "name": "Bitwarden",
            "icon": "bitwarden",
            "url": "https://www.example.com/bitwarden"
        }
    ]
}
 ```
You can find the list of supported icons in the folder docs/assets/apps

## Security

This script is using a JSON configuration file. This file will expose your urls, and you may not want that.

Since there is no way to give such a file to a userscript, I'm getting it using XMLHttpRequest. That means your file must be accessible from the place you execute the script (your browser). If you do not want to make this file easy to find, I suggest you hide it behind an obfuscated URL (like a UUID or something like that). This is not a true security but we are trying to hide urls, if the hacker has to try billions of URLs to find a file exposing URLs, he may have found your secret URLs before the JSON file. I don't know if I'm clear ;)

You will also need to configure CORS properly to allow all the subdomains where you will inject the script.

You can find an example here for Nginx : http://rustyrazorblade.com/post/2013/2013-10-31-cors-with-wildcard-domains-and-nginx/

## Copyright

All the icons are copyrighted by their project owners (name of the icon = name of the project)
The icon I use for the menu are from font awesome ( https://fontawesome.com/ )

## Contribute

If you want to contribute, here is something to start. This will work only on linux since it's using bash command in the build process. If you want to make a nice gulp toolchain, feel free to contribute ;)

```
npm install -g browserify typescript tslint uglify-js npx
npm install
```
Then to run the demo instance just do 
```
npm run serve
```
If you want to build the user script, do
```
npm run build
```


