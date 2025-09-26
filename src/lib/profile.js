import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "../firebase/Configuration";
import { collectionNames } from "../constant";


export const getProfile = async (id) => {
    try {

        const docRef = await doc(fireStoreDB, collectionNames.profile, id)
        const document = await getDoc(docRef)

        if (document.exists) {
           return document.data()
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const updateProfile = async (id, data) => {
    try {
       
        const docRef = doc(fireStoreDB, collectionNames.profile, id)
        await updateDoc(docRef, data)
        return true
    } catch (error) {
        return null
    }
}