const admin = require('firebase-admin');

const settings = require('../settings');


exports.generateTan = async function(request, response) {
    let hashedId = request.body.phoneNumber;

    if (!hashedId || hashedId.length !== 65) {
        try {
            hashedId = JSON.parse(request.body).phoneNumber
        } catch (ex) {}
    }

    if(!!hashedId && hashedId.length === 65 && validateHash(hashedId)) {
        let tanDocRef = admin.firestore().collection('tan').doc(hashedId);
        const savedTanDoc = (await tanDocRef.get());
        const generatedTan = generateRandomString(32);

        if(!!savedTanDoc && !!savedTanDoc.data()) {
            if (validateTanDoc(savedTanDoc)) {
                await tanDocRef.update({
                    'lAt': Date.now()
                });
                return response.status(200).send({uuid: tanDocRef.tan, status: 200});
            } else {
                await tanDocRef.update({
                    'tan': generatedTan,
                    'lAt': Date.now(),
                });
                return response.status(200).send({uuid: generatedTan, status: 200});
            }
        }

        await tanDocRef.set({
            'tan': generatedTan,
            'lAt': Date.now(),
            'count': 0
        });
        return response.status(200).send({uuid: generatedTan, status: 200});
    }

    return response.status(403).send("Access Denied");
};


function validateTanDoc(savedTanDoc) {
    if (!!savedTanDoc  && !!savedTanDoc.data()) {
        if (savedTanDoc.lAt != null && (savedTanDoc.lAt + settings.getTanValidDuration()) < Date.now()) {
            return  true;
        }
    }
    return false;
}


async function validateTanUsage(tan) {
    let tanCollection = admin.firestore().collection('tan').where('tan','==', tan);
    const tanCollectionDocs = (await tanCollection.get());

    if (tanCollectionDocs != null && tanCollectionDocs.docs != null  && tanCollectionDocs.docs.length >= 1 && tanCollectionDocs.docs[0].data() != null) {
        if (tanCollectionDocs.docs[0].data().count < settings.getMaxRequestCount()) {
            await tanCollectionDocs.docs[0].ref.update({
               'count' : admin.firestore.FieldValue.increment(1)
            });
            return  true;
        }
    }
    return false;
}
exports.validateTanUsage = validateTanUsage;

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function validateHash(hash) {
    const firstIntIndex = hash.search(/\d/);
    const firstInt = parseInt(hash.charAt(firstIntIndex));

    const firstLetterIndex = hash.search(/\D/);
    const firstLetter = hash.charAt(firstLetterIndex);
    const firstLetterCharcode = firstLetter.charCodeAt(0);

    let newCharCode = firstLetterCharcode + firstInt;

    if(newCharCode > 122) {
        newCharCode = newCharCode - 26;
    }

    if(hash.charAt(firstInt + firstLetterIndex + firstIntIndex) === String.fromCharCode(newCharCode)) {
        return true;
    }

    return false;
}