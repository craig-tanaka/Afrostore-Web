const db = firebase.firestore();
// const storage = firebase.storage();
// const bucket = storage.bucket_.bucket;

var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Temp variable to hold the anonymous user data if needed.
var data = null;
// Hold a reference to the anonymous current user.
var anonymousUser = firebase.auth().currentUser;

ui.start('#firebaseui-auth-container', {
    signInSuccessUrl: '../index.html',
    // Whether to upgrade anonymous users should be explicitly provided.
    // The user must already be signed in anonymously before FirebaseUI is
    // rendered.
    autoUpgradeAnonymousUsers: true,
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // Process result. This will not trigger on merge conflicts.
            // db.collection('users' +  )
            console.log(authResult)
            // On success redirect to signInSuccessUrl.
            return false;
          },

        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function(error) {
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
            }
            // The credential the user tried to sign in with.
            var cred = error.credential;
            // If using Firebase Realtime Database. The anonymous user data has to be
            // copied to the non-anonymous user.
            var app = firebase.app();
            // Save anonymous user data first.
            return app.database().collection('users/' + firebase.auth().currentUser.uid)
                .once('value')
                .then(function(snapshot) {
                data = snapshot.val();
                // This will trigger onAuthStateChanged listener which
                // could trigger a redirect to another page.
                // Ensure the upgrade flow is not interrupted by that callback
                // and that this is given enough time to complete before
                // redirection.
                return firebase.auth().signInWithCredential(cred);
                })
                .then(function(user) {
                // Original Anonymous Auth instance now has the new user.
                return app.database().collection('users/' + user.uid).set(data);
                })
                .then(function() {
                // Delete anonymnous user.
                return anonymousUser.delete();
                }).then(function() {
                // Clear data in case a new user signs in, and the state change
                // triggers.
                data = null;
                // FirebaseUI will reset and the UI cleared when this promise
                // resolves.
                // signInSuccessWithAuthResult will not run. Successful sign-in
                // logic has to be run explicitly.
                window.location.assign('<url-to-redirect-to-on-success>');
                });
            },
            
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.querySelector('.lds-hourglass').style.display = 'none';
        }
      },
    signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   requireDisplayName: false
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
              'https://www.googleapis.com/auth/contacts.readonly'
            ]
          },
          {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: [
              'public_profile',
              'email'
            ],
            customParameters: {
              // Forces password re-entry.
              auth_type: 'reauthenticate'
            }
          }
      ]
})

ui.start();
