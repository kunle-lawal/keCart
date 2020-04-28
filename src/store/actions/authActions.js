export const signUp = (type) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const auth = firebase.auth();
        const firestore = getFirestore();
        var provider
        if (type === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        } else {
            auth.signInAnonymously().then(() => {
                auth.onAuthStateChanged((userData) => {
                    let uid = userData.uid;
                    firestore.collection('users').doc('usernames').update({
                        allUsers: firebase.firestore.FieldValue.arrayUnion("newUser2")
                    }).then(() => {
                        firestore.collection('users').doc(uid).set({
                            username: "newUser",
                        })
                    })
                })
                dispatch({ type: 'LOGIN_SUCCESS'})
            }).catch((err) => {
                dispatch({ type: 'LOGIN_ERROR' }, err)
            })
        }
        // var provider = (type === 'twitter') ? new firebase.auth.TwitterAuthProvider() : new firebase.auth.FacebookAuthProvider(); 
        // firebase.auth().useDeviceLanguage() //This is to use the device provided language.
    }
}

export const login = (type) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const auth = firebase.auth();
        auth.getRedirectResult().then((result) => {
            // var token = result.credential.accessToken;
            // var secret = result.credential.secret;
            var user = result.user;
            let handle = result.additionalUserInfo.profile.given_name

            firestore.collection('users').doc(user.uid).set({
                username: user.displayName,
                handle: handle,
                emailVerified: user.emailVerified,
                email: type === 'twitter.com' ? 'none' : user.email,
            })
            // firestore.collection('userProfile').doc('users').update({
            //     allUsers: firebase.firestore.FieldValue.arrayUnion(handle)
            // }).then(() => {
            //     dispatch({ type: 'SIGNUP_SUCCESSFUL' })
            // })
        }).catch(function (error) {
            dispatch({ type: 'SIGNUP_SUCCESSFUL', err: error })
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
        });
    }
}

export const addUser = (username, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore.collection('users').doc('usernames').update({
            allUsers: firebase.firestore.FieldValue.arrayUnion(username)
        }).then(() => {
            firestore.collection('users').doc(uid).set({
                username: username,
            })
        })
    }
}