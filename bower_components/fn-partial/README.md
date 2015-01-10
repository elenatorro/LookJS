# fn-partial <a href="http://bower.io/search/?q=fn-partial"><img src="http://benschwarz.github.io/bower-badges/badge@2x.png" width="130" height="30"></a>

[![Build Status](http://img.shields.io/travis/Kikobeats/fn-partial/master.svg?style=flat)](https://travis-ci.org/Kikobeats/fn-partial)
[![Dependency status](http://img.shields.io/david/kikobeats/fn-partial.svg?style=flat)](https://david-dm.org/kikobeats/fn-partial)
[![Dev Dependencies Status](http://img.shields.io/david/dev/kikobeats/fn-partial.svg?style=flat)](https://david-dm.org/kikobeats/fn-partial#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/fn-partial.svg?style=flat)](https://www.npmjs.org/package/fn-partial)
[![Gittip](http://img.shields.io/gittip/kikobeats.svg?style=flat)](https://www.gittip.com/kikobeats/)

> Feel like a memory pointer. Pass a reference to a function.

Javascript is a very dynamic language, but sometimes you need to be more dynamic.

If you need to use something as memory pointers in C isn't possible in JavaScript, but you can do an alternative: a function that calculate the result dynamically.

For example, imagine that you have a collection of players

```js
var players = {
  one: 'Kiko',
  two: 'Ricard',
  three: 'Xavi'
};
```

and you have a function that return the number of players in the collection:

```js
var size = function(objt){
  return Object.keys(objt).length;
};
```

Now, you want to know the numbers of players, and you need to have 4 players for start a new game.

If you do something like this:

```js
var numPlayers = size(players);
console.log(numPlayers); // => 3
players.four = 'Ben';
console.log(numPlayers); // => 3, expected 4 :(
```

It's fail because the value is assigned when you call the function.

In languages as C you can create a pointer in the same memory direction and know the value in any time because the pointer referenced the value.

With this package you can simulate something like that.

```js
var partial = require('fn-partial')
var numPlayers = partial(size, players);
console.log(numPlayers()); // => 3
players.four = 'Ben';
console.log(numPlayers()); // => 4 YEAH!
```

More information and the history of this code in [StackOverflow](https://stackoverflow.com/questions/373157/how-can-i-pass-a-reference-to-a-function-with-parameters)

## Install

```bash
npm install fn-partial --save
```

If you want to use in the browser (powered by [Browserify](http://browserify.org/)):

```bash
bower install fn-partial --save
```

and later link in your HTML:

```html
<script src="bower_components/fn-partial/dist/fn-partial.js"></script>
```

## Usage

```js
var partial = require('fn-partial');

// Call a function without arguments
var result = partial(sayHello());
result();
// => console.log("Hello World");

// Call a function with arguments
var result = partial(sayHello, 'Kiko', ', how are you?');
result();
// => console.log("Hello World, Kiko!, how are you?")
```

## License

MIT © [Kiko Beats](http://www.kikobeats.com)
