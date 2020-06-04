const{ setupFireStore,teardown} = require('./helpers');
const{ assertFails,assertSucceeds} = require('@firebase/testing');
const firebase  = require('firebase');

describe('Client firestore access ', () => {
    let db;

    beforeAll(async () => {
        db = await setupFireStore({
            uid: 'this',
            email: "this@mandarin-medien.de"
        }, {
            'tan/tan1':{
                "content": "someName"
            },
            'tan/tan2':{
                "content": "otherName"
            }
        });

    });

    afterAll(async () => {
        await teardown();
    });

    // MESSAGES
    test('Fail when reading all messages', async () => {
        const docRef = db.collection('tan');
        await expect(docRef.get()).toDeny();
    });

    test('Fail when reading a single message', async () => {
        const docRef = db.collection('tan').doc('message1');
        await expect(docRef.get()).toDeny();
    });

    test('Fail when writing a new message', async () => {
        const docRef = db.collection('tan').doc();
        await expect(docRef.set({
            'content': "any"
        })).toDeny();
    });


    test('Fail when updating a message', async () => {
        const docRef = db.collection('tan').doc('message1');
        await expect(docRef.update({
            'content': "any"
        })).toDeny();
    });

    test('Fail when deleting a message', async () => {
        const docRef = db.collection('tan').doc('message1');
        await expect(docRef.delete()).toDeny();
    });


});
