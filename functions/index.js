
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

const env = require('./env');
const test = require('./v1_0/test');
const tan = require('./v1_0/tan');
const config = require('./v1_0/config');
const cleanup = require('./v1_0/cleanup');

const infectionMessages = require('./v1_0/infection_messages');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({timestampsInSnapshots: true});

let path = '/v1_0';

app.use(function(req, res, next) {
    if (req.path === (path+  "/cleanup")) {
        console.log(req.path);

        next();
    } else {
        if (!req.headers.authorizationkey) {
            return res.status(403).json({ error: 'No credentials sent!' });
        }

        if (req.headers.authorizationkey !== env.getApiKey()) {
            return res.status(403).json({ error: 'Wrong credentials sent!' });
        }


        next();
    }


});

app.post(path + '/cleanup', (request, response) => cleanup.runCleanup(request, response));
app.post(path + '/request-tan', (request, response) => tan.generateTan(request, response));
app.put(path + '/infection-info', (request, response) => infectionMessages.saveNewInfectionMessage(request, response));
app.route(path + '/configuration').get((request, response) => config.getConfig(request, response));


// Logging all requests that don't go to the routes above (remove after app is working correctly)
app.post(path + '/*', (request, response) => test.logRoute(request, response));
app.route(path + '/*').get( (request, response) => test.logRoute(request, response));
app.put(path + '/*', (request, response) => test.logRoute(request, response));
app.delete(path + '/*', (request, response) => test.logRoute(request, response));

exports.api = functions.region('europe-west3').https.onRequest(app);
