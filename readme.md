<h1 align="center">
  <br>
  Stopp Corona
  <br>
</h1>



<p align="center">
  <a href="#about">About</a> •
  <a href="#checklist">Checklist</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#tests">Tests</a> •
  <a href="#license">License</a>
</p>


#About
This is the backend application for the Projects  <a href="https://github.com/Mandarin-Medien/stopp-corona-de-android">stopp-corona-de-android</a> and  <a href="https://github.com/Mandarin-Medien/stopp-corona-de-ios">stopp-corona-de-ios</a> developed for  <a href="https://firebase.google.com/">firebase</a>

#Checklist

1. Create a firebase project and activate the firebase firestore database and firebase functions 
1. Add your own .firebaserc or copy the example.firebaserc and replace the placeholders
1. Copy functions/env.example.js to functions/env.js and replace the placeholders

#Deployment

1. Run npm install in functions folder 
1. Just use firebase deploy to deploy the functions

#Tests

1. Run npm install in root folder 
1. Install Firebase emulators if not already installed
1. Run firebase emulators:start --only firestore
1. Use npm run test

#License

This code is distributed under the Apache License 2.0. See the [LICENSE.txt](LICENSE.txt) file for more info.

