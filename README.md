<center>
	<img src="https://user-images.githubusercontent.com/84878036/232329718-b1fb732d-9827-4321-b8c5-e2d53755eca0.png" />
	<h3>An API wrapper for BetBux.gg<h2>
</center>

The Betbux.gg API wrapper is a tool designed to simplify the way users interact with the site's features. 
It provides a set of well-documented functions and methods that make it easy to access gambling and other site functionalities.
By reducing the complexity of making requests to the site's servers (handling websocket connections), this API wrapper saves time and effort, 
making it an ideal solution for developers of all skill levels. 

## Installation

To begin using the wrapper, you can install it via NPM:

```
npm install betbux.js
```

Now import it into your project

```js
const { Client } = require("betbux.js");
const client = new Client("Authorization Token");

client.me.getAuthenticated()
    .then((userInfo) => console.log(userInfo))
    .catch((err) => console.log(err))

```
