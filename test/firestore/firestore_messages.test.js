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
            'messages/message1':{
                "content": "someName"
            },
            'messages/message2':{
                "content": "otherName"
            }
        });

    });

    afterAll(async () => {
        await teardown();
    });

    // MESSAGES
    test('Success when reading all messages', async () => {
        const docRef = db.collection('messages');
        await expect(docRef.get()).toAllow();
    });

    test('Success when reading a single message', async () => {
        const docRef = db.collection('messages').doc('message1');
        await expect(docRef.get()).toAllow();
    });

    test('Fail when writing a new message', async () => {
        const docRef = db.collection('messages').doc();
        await expect(docRef.set({
            'content': "any"
        })).toDeny();
    });


    test('Fail when updating a message', async () => {
        const docRef = db.collection('messages').doc('message1');
        await expect(docRef.update({
            'content': "any"
        })).toDeny();
    });

    test('Fail when deleting a message', async () => {
        const docRef = db.collection('messages').doc('message1');
        await expect(docRef.delete()).toDeny();
    });


});
