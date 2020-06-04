const env = require( "../env");
const settings = require ("../settings");
const admin = require('firebase-admin');

exports.runCleanup = async function(request, response) {
    let secret = request.body.secret;

     if(secret === env.getCronKey()) {

         let currentTimestamp = Date.now();
         let deleteTimestampToken = currentTimestamp - settings.getCleanupTimeToken();

         const tanCollection = admin.firestore().collection('tan').where('lAt','<', deleteTimestampToken);
         const tanCollectionDocs = (await tanCollection.get());
         let batchTan = admin.firestore().batch();
         let tanCounter = 0;

         console.log(deleteTimestampToken);
         console.log(tanCollectionDocs.docs.length);

         if (tanCollectionDocs != null && tanCollectionDocs.docs != null  && tanCollectionDocs.docs.length > 0 ) {

             for (let i=0; i < tanCollectionDocs.docs.length; i++) {
                 tanCounter ++;
                 batchTan.delete(tanCollectionDocs.docs[i].ref);

                 if (tanCounter >= 400) {
                     tanCounter = 0;
                     await batchTan.commit();
                     batchTan = admin.firestore().batch();
                 }
             }
             await batchTan.commit();
         }


         let deleteTimestampMessage= currentTimestamp - settings.getCleanupTimeMessage();

         const messageCollection = admin.firestore().collection('messages').where('cAt','<', deleteTimestampMessage);
         const messageCollectionDocs = (await messageCollection.get());
         let batchMessages = admin.firestore().batch();
         let messagesCounter = 0;

         console.log(deleteTimestampMessage);
         console.log(messageCollectionDocs.docs.length);

         if (messageCollectionDocs != null && messageCollectionDocs.docs != null  && messageCollectionDocs.docs.length > 0 ) {

             for (let i=0; i < messageCollectionDocs.docs.length; i++) {
                 messagesCounter ++;
                 batchMessages.delete(messageCollectionDocs.docs[i].ref);

                 if (messagesCounter >= 400) {
                     messagesCounter = 0;
                     await batchMessages.commit();
                     batchMessages = admin.firestore().batch();
                 }
             }
             await batchMessages.commit();
         }
         return response.status(200).send("OK");
     } else {
        return response.status(403).send("Access Denied");
     }
};
