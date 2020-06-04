const admin = require('firebase-admin');
const tan = require('./tan');

exports.saveNewInfectionMessage = async function(request, response) {
    let uuid = request.body.uuid;
    try {
        if(await tan.validateTanUsage(uuid)) {
            // each Infection Message has "message" and "addressPrefix"
            let infectionMessages = request.body['infection-messages'];

            let batch = admin.firestore().batch();
            let messagingFutures = [];

            for(let i = 0; i < infectionMessages.length; i++) {
                const ref = admin.firestore().collection('messages').doc();
                batch.set(ref, {
                    cAt: Date.now(),
                    content: infectionMessages[i].message,
                    pre: infectionMessages[i].addressPrefix
                });

                const message = {
                    data: {
                        action: "Client must fetch new data"
                    },
                    topic: infectionMessages[i].addressPrefix
                };

                messagingFutures.push(admin.messaging().send(message));
            }

            await batch.commit();
            await Promise.all(messagingFutures);

            return response.status(200).send("OK");
        }
    } catch (e) {
        console.log(e);
    }

    return response.status(403).send("Access Denied");
};