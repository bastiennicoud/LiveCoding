# Manifest.json specification

Each games developed for the platform must provide a `manifest.json` file at the root of the folder.

This file provide base informations about your game, thats allow the platform to correctly load the game.

## Manifest.json example

```json
{
  "name": "Test",
  "description": "A meaningless game for test purpose.",
  "data": {
    "libraries": [
      { "cdn": true, "url": "https://tutu.com/toto" }
    ],
    "game": "game.mjs",
    "assets": "assets"
  },
  "interpreters": {
    "php": "interpreters/php.php",
    "ruby": "interpreters/ruby.rb",
    "javascript": "interpreters/javascript.js",
    "python": "interpreters/python.py"
  },
  "instructions": [
    {
      "name": "Commandes",
      "description": "Game commands index.",
      "path": "instructions/commands.md"
    },
    {
      "name": "Instructions",
      "description": "Instructions to finish the exercice.",
      "path": "instructions/readme.md"
    }
  ]
}
```

## Specification

### name
Specifies the name of your game (displayed in the title bar of te LiveCoding app).
```json
{
  "name": ".."
}
```

### description
A simple desription of the game.
```json
{
  "description": ".."
}
```

### data
The data key contains all the paths related to the game engine and assets.
```js
{
  "data": {
    // See below for child key specs
  }
}
```

#### data > game
The game key specifies the entry file of the game.
```json
{
  "data": {
    "game": "main.js"
  }
}
```
This file **must be** and `.js` file that respect the esm modules specification, because the platform loads the game using es6 modules.
This file must contain a base class called `Game` exported with es6 syntax : `export class Game { ... }`, the platform will instanciate this class to start the game, see the [Game class documentation](./game_class_specs.md) for detailed informations.

#### data > libraries
The libraries key is an array of libraries that needs to be loaded in the window context before loading the game.
```js
{
  "data": {
    "libraries": [
      // ...
    ]
  }
}
```
The array must contain objects thats respects the following pattern :
```json
{
  "cdn": true,
  "url": "http://test.com/mylibrary.min.js"
}
```
The `cdn` key specifies if the ressource must be loaded form an external source (mostly cdn's) or if the library must be loaded directly from the game repo.
The `url` key specify the resource endpoint.

#### data > assets
This key specifies the location where all the game assets will be stored. The app will use this key to generate a complete path to the assets you can use to load assets in our game.
```json
{
  "data": {
    "assets": "assets"
  }
}
```

### interpreters
The interpreters key contains all the interpreters supported by the game, and the path to the command file specific to the game.
```json
{
  "interpreters": {
    "php": "interpreters/php.php",
    "ruby": "interpreters/ruby.rb"
  }
}
```

### instructions
The instructions key is an array that lists diffrents files containing instructions. LiveCoding will iterates the array and creates links on the navbar of the app to this files. This allow the user to consult the app instructions directly from the platform. If you use GitHub, the Markdown files will be rendered nicely !
```json
{
  "instructions": [
    {
      "name": "Commandes",
      "description": "Available commands in the game",
      "path": "instructions/commands.md"
    },
    {
      "name": "Consignes",
      "description": "A litle exercice to test the game",
      "path": "instructions/readme.md"
    }
  ]
}
```
