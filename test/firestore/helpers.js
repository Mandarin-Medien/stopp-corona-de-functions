const firebase = require('@firebase/testing');
const fs = require('fs');
const projectId = "rules-spec-"+ (new Date().getTime());

module.exports.setupFireStore = async (auth,data) => {
    let app = await firebase.initializeTestApp({
        projectId,
        auth
    });
    let adminApp = getFirestoreAdminApp();

    if (data) {
       for(const key in data) {
           const ref = adminApp.doc(key);
           await ref.set(data[key]);
       }
    }

    let rules = fs.readFileSync('firestore.rules').toString();

    await firebase.loadFirestoreRules( {
       projectId: projectId,
       rules: rules
    });

    return app.firestore();
};

module.exports.teardown = async () => {
    Promise.all(firebase.apps().map(app => app.delete()));
};


expect.extend({
    async toAllow(x) {
        let pass = false;
        try {
            await  firebase.assertSucceeds(x);
            pass = true;
        } catch(ex) {}

        return {
            pass,
            message: () => 'Expected Firebase operation to be allowed, but it was denied'
        };
    }
});



expect.extend({
    async toDeny(x) {
        let pass = false;
        try {
            await  firebase.assertFails(x);
            pass = true;
        } catch(ex) {}

        return {
            pass,
            message: () => 'Expected Firebase operation to be denied, but it was allowed'
        };
    }
});

getFirestoreAdminApp = () => firebase.initializeAdminApp({ projectId }).firestore();
module.exports.getFirestoreAdminApp = () => getFirestoreAdminApp() ;

