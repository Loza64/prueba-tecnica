<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">Rest api hecho con.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

Prueba tecnica BetaCode

## creat un .env

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=spotify

TOKEN_SECRET=

PORT= 4000
```

## Rutas api

### POST

 **login**:  <http://localhost:4000/user/login>

 ```
{
    "email": "",
    "password": ""
}
 ```

 **sign up**: <http://localhost:4000/user/signup>

 ```
{
  "username": "v",
  "country": "",
  "postalCode": 28001,
  "email": "",
  "birthdate": "1990-05-15",
  "gender": "",
  "password": ""
}
 ```

 **payment** : <http://localhost:4000/user/payment> H Authorization Bearer "your token"

  ```
{
    "amount": 23,
    "method": "paypal"
}
 ```

**save artist**: <http://localhost:4000/artist/save>

```
{
    "name": "Xtrullor",
    "image": "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
}
```

**save album**: <http://localhost:4000/artist/save/album?artist=5>

```
{
    "title": "Raity",
    "year_date": "1990-03-01",
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Itunes-music-app-icon.png"
}
```

**save song**: <http://localhost:4000/song/save?album=2>

```
{
  "title": "LALALA",
  "durationInMinutes": 2.92,
  "reproductions": 0
}
```

**create playlist** <http://localhost:4000/playlist/create/mine>  H Authorization Bearer "your token"

```{
  "title": "My Playlist4 4",
  "description": "This is an updated description for my playlist. Now with better songs!",
  "type": "public"
}
```

### GET

**profile**: <http://localhost:4000/user/profile>  H Authorization Bearer "your token"

**follow artist**: <http://localhost:4000/user/follow?artist=1>  H Authorization Bearer "your token"

**favorite album**: <http://localhost:4000/user/favorite/album?id=2>  H Authorization Bearer "your token"

**favorite song**: <http://localhost:4000/user/favorite/song?id=3>  H Authorization Bearer "your token"

**list artist**: <http://localhost:4000/artist/list>

**song list**: <http://localhost:4000/song/list>

**song list by album**: <http://localhost:4000/song/list?album=2>

**listen or play song**: <http://localhost:4000/song/play?song=2>  H Authorization Bearer "your token"

**playlist list**: <http://localhost:4000/playlist/list>  H Authorization Bearer "your token"

**add song to my playlist or playlist public**: <http://localhost:4000/playlist/save/music?song=2&playlist=10>  H Authorization Bearer "your token"

**restore playlist**: <http://localhost:4000/playlist/restore?playlist=3> H Authorization Bearer "your token"

### DELETE

**delete playlist**: <http://localhost:4000/playlist/delete?playlist=3>  H Authorization Bearer "your token"
