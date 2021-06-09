# pupil-admin
keep in mind everything you did with your pupils
manage your lessons in a weekly schedule
plan your week at a glance

this project uses authentication as proposed on
https://blog.sqreen.com/authentication-best-practices-vue/
https://github.com/sqreen/vue-authentication-example
thank you very much thibaud :-)

there is a datepicker in here from
https://npm.io/package/vue-datepicker
which in itself utilizes the moment library.

and some autocompletion
https://github.com/charliekassel/vuejs-autocomplete
to make searching more neat.

thanks so much to robin wieruch for giving deep insights
into backend and api's.... this project contains a fork 
of his node backend boilerplate
https://github.com/rwieruch/node-express-server-rest-api


api endpoints
GET /pupils
POST /pupils
GET /lessons
POST /lessons

database structure
------------------

lessons:
    id,
    name,
    pupils,
    works,
    date,
    venues,
    frequency,
    duration

pupils:
    id,
    firstname,
    lastname,
    created

works:
    id,
    composer,
    title

venues:
    id,
    name,
    town,
    street,
    streetnumber,
    zipcode

frequencies:
    id,
    periodindays

durations:
    id,
    minutes

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
