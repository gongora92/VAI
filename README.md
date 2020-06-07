## VAI Trade

## Configuration MongoDB

Create a database called VAI and import the lexicalWords and users collections

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the dependecies

```bash
npm install
```

## Usage

```bash
npm start
```

## Add a new word

First you will have to get an auth token, for this you have to go to POST /auth the token is gonna be included in the response header (VAIToken)
The credentials are: username 'VAIUser' and password 'AdminVAI'
Once you get the token you will need to add it to the request header with the name VAIToken


