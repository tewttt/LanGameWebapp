import React from "react";
import FirebaseKeys from "../firebase";
import { db } from "../firebase";


const Fire = () => {

    
    const uid = () => {
        return (firebase.auth().currentUser || {}.uid)
    }
    const timestamp = () => {
        return Date.now();
    }
}
export default Fire;
