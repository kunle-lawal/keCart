export const addCart = (cartName) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection("users");
        firestore.collection('carts').add({
            cartItems: [],
            total: 0,
            cartName: cartName
        }).then((docRef) => {
            let cartData = {
                cartRef: docRef.id,
                cartName: cartName,
                date: Date.now()
            }
            console.log(cartData);
            firestore.collection('users').doc(user.uid).set({
                myLists: firebase.firestore.FieldValue.arrayUnion(cartData)
            }, { merge: true })
            dispatch({ type: "LIST_ADDED", item: docRef.id })
        })
    }
}

export const addCartItem = (cartUID, cartItem) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection("users");

        firestore.collection('carts').doc(cartUID).collection("cartItems").add({
            checked: cartItem.checked,
            item: cartItem.item,
            total: cartItem.total
        }).then(() => {
            dispatch({ type: "CART_ITEM_ADDED", item: cartItem })
        })
    }
}

export const updateCartItem = (cartUID, newData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection("users");
        console.log(newData);
        firestore.collection('carts').doc(cartUID).collection("cartItems").doc(newData.id).set({
            [newData.key]: newData.data 
        }, { merge: true });
        dispatch({ type: "CART_ITEM_UPDATED" })
    }
}

export const deleteCartItem = (cartUID, cartItem) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const userCollection = firestore.collection("users");

        firestore.collection('carts').doc(cartUID).update({
            cartItems: firebase.firestore.FieldValue.arrayRemove(cartItem)
        }).then(() => {
            dispatch({ type: "DELETE_CART_ITEM", item: cartItem  })
        })
    }
}

